using System.Net.Http.Headers;
using System.Text.Json;
using FairOddsConsole.Domain;

namespace FairOddsConsole.Infrastructure;

public class ApiFootballDataProvider : IFootballDataProvider
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public ApiFootballDataProvider(HttpClient? httpClient = null, string? apiKey = null)
    {
        _httpClient = httpClient ?? new HttpClient
        {
            BaseAddress = new Uri("https://v3.football.api-sports.io/"),
            Timeout = TimeSpan.FromSeconds(15)
        };

        _apiKey = apiKey ?? Environment.GetEnvironmentVariable("API_FOOTBALL_KEY") ?? string.Empty;
        if (!string.IsNullOrWhiteSpace(_apiKey))
        {
            if (!_httpClient.DefaultRequestHeaders.Contains("x-apisports-key"))
            {
                _httpClient.DefaultRequestHeaders.Add("x-apisports-key", _apiKey);
            }
        }
    }

    public async Task<List<Fixture>> GetFixturesAsync(DateTime from, DateTime to)
    {
        var fixtures = new List<Fixture>();
        var url = $"fixtures?from={from:yyyy-MM-dd}&to={to:yyyy-MM-dd}";
        using var request = new HttpRequestMessage(HttpMethod.Get, url);
        AddHeaders(request);

        using var response = await _httpClient.SendAsync(request);
        if (!response.IsSuccessStatusCode)
        {
            return fixtures;
        }

        await using var stream = await response.Content.ReadAsStreamAsync();
        using var doc = await JsonDocument.ParseAsync(stream);
        if (!doc.RootElement.TryGetProperty("response", out var responseArray))
        {
            return fixtures;
        }

        foreach (var fx in responseArray.EnumerateArray())
        {
            var fixtureNode = fx.GetProperty("fixture");
            var teamsNode = fx.GetProperty("teams");
            var leagueNode = fx.GetProperty("league");

            fixtures.Add(new Fixture
            {
                ApiFixtureId = fixtureNode.GetProperty("id").GetInt32(),
                Kickoff = fixtureNode.GetProperty("date").GetDateTime(),
                HomeTeam = teamsNode.GetProperty("home").GetProperty("name").GetString() ?? string.Empty,
                AwayTeam = teamsNode.GetProperty("away").GetProperty("name").GetString() ?? string.Empty,
                League = leagueNode.GetProperty("name").GetString() ?? string.Empty
            });
        }

        return fixtures;
    }

    public async Task<Odds?> GetOddsAsync(Fixture fx)
    {
        if (fx.ApiFixtureId is null)
        {
            return null;
        }

        var url = $"odds?fixture={fx.ApiFixtureId}";
        using var request = new HttpRequestMessage(HttpMethod.Get, url);
        AddHeaders(request);

        using var response = await _httpClient.SendAsync(request);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        await using var stream = await response.Content.ReadAsStreamAsync();
        using var doc = await JsonDocument.ParseAsync(stream);
        if (!doc.RootElement.TryGetProperty("response", out var responseArray) || responseArray.GetArrayLength() == 0)
        {
            return null;
        }

        var firstOffer = responseArray[0];
        if (!firstOffer.TryGetProperty("bookmakers", out var bookmakersArray) || bookmakersArray.GetArrayLength() == 0)
        {
            return null;
        }

        var bets = bookmakersArray[0].GetProperty("bets");
        var odds = new Odds();

        foreach (var bet in bets.EnumerateArray())
        {
            var name = bet.GetProperty("name").GetString()?.ToLowerInvariant();
            if (name is null)
            {
                continue;
            }

            var values = bet.GetProperty("values");
            switch (name)
            {
                case "match winner":
                    foreach (var val in values.EnumerateArray())
                    {
                        var label = val.GetProperty("value").GetString()?.ToLowerInvariant();
                        var odd = ParseOdd(val.GetProperty("odd").GetString());
                        if (odd <= 0)
                        {
                            continue;
                        }
                        if (label == "home") odds.HomeWin = odd;
                        else if (label == "draw") odds.Draw = odd;
                        else if (label == "away") odds.AwayWin = odd;
                    }
                    break;
                case "goals over/under":
                    foreach (var val in values.EnumerateArray())
                    {
                        var label = val.GetProperty("value").GetString();
                        var odd = ParseOdd(val.GetProperty("odd").GetString());
                        if (label == "Over 2.5") odds.Over2_5 = odd;
                        if (label == "Under 2.5") odds.Under2_5 = odd;
                    }
                    break;
                case "both teams to score":
                    foreach (var val in values.EnumerateArray())
                    {
                        var label = val.GetProperty("value").GetString()?.ToLowerInvariant();
                        var odd = ParseOdd(val.GetProperty("odd").GetString());
                        if (label == "yes") odds.BTTS_Yes = odd;
                        if (label == "no") odds.BTTS_No = odd;
                    }
                    break;
            }
        }

        if (odds.HomeWin == 0 || odds.AwayWin == 0 || odds.Draw == 0)
        {
            return null;
        }

        return odds;
    }

    private static double ParseOdd(string? value)
    {
        return double.TryParse(value, out var d) ? d : 0d;
    }

    private void AddHeaders(HttpRequestMessage request)
    {
        if (!string.IsNullOrWhiteSpace(_apiKey))
        {
            request.Headers.TryAddWithoutValidation("x-apisports-key", _apiKey);
        }
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }
}
