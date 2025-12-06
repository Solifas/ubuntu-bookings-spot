using FairOddsConsole.Domain;

namespace FairOddsConsole.Services;

public class BetRecommendationService
{
    private readonly ExpectedGoalsCalculator _goalsCalculator;
    private readonly MarketProbabilityService _marketProbabilityService;
    private readonly FairOddsService _fairOddsService;
    private readonly TeamStrengthService _teamStrengthService;
    private readonly LeagueConfigService _leagueConfigService;

    private const double EdgeThreshold = 0.02;

    public BetRecommendationService(
        ExpectedGoalsCalculator goalsCalculator,
        MarketProbabilityService marketProbabilityService,
        FairOddsService fairOddsService,
        TeamStrengthService teamStrengthService,
        LeagueConfigService leagueConfigService)
    {
        _goalsCalculator = goalsCalculator;
        _marketProbabilityService = marketProbabilityService;
        _fairOddsService = fairOddsService;
        _teamStrengthService = teamStrengthService;
        _leagueConfigService = leagueConfigService;
    }

    public BetRecommendation Evaluate(Fixture fixture, Odds odds)
    {
        var homeStrength = _teamStrengthService.GetStrength(fixture.HomeTeam);
        var awayStrength = _teamStrengthService.GetStrength(fixture.AwayTeam);
        var leagueConfig = _leagueConfigService.GetConfig(fixture.League);

        var expectedGoals = _goalsCalculator.Calculate(homeStrength, awayStrength, leagueConfig);
        var probabilities = _marketProbabilityService.Calculate(expectedGoals.Home, expectedGoals.Away);
        var fairOdds = _fairOddsService.CalculateFairOdds(probabilities);
        var edges = _fairOddsService.CalculateEdges(probabilities, odds);

        var recommended = BuildRecommendations(edges);

        return new BetRecommendation
        {
            Fixture = fixture,
            Odds = odds,
            Probabilities = probabilities,
            FairOdds = fairOdds,
            Edges = edges,
            RecommendedMarkets = recommended,
            ExpectedGoals = expectedGoals
        };
    }

    private static List<string> BuildRecommendations(MarketEdges edges)
    {
        var markets = new List<(string Label, double Edge)>
        {
            ("Home Win", edges.HomeWin),
            ("Draw", edges.Draw),
            ("Away Win", edges.AwayWin),
            ("Under 2.5 Goals", edges.Under2_5),
            ("Over 2.5 Goals", edges.Over2_5),
            ("BTTS Yes", edges.BTTS_Yes),
            ("BTTS No", edges.BTTS_No)
        };

        return markets.Where(m => m.Edge > EdgeThreshold)
                       .OrderByDescending(m => m.Edge)
                       .Select(m => m.Label)
                       .ToList();
    }
}
