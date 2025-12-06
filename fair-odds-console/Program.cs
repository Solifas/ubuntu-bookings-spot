using FairOddsConsole.Domain;
using FairOddsConsole.Infrastructure;
using FairOddsConsole.Services;

var apiProvider = new ApiFootballDataProvider();
var teamStrengthService = new TeamStrengthService();
var leagueConfigService = new LeagueConfigService();
var expectedGoalsCalculator = new ExpectedGoalsCalculator();
var poissonEngine = new PoissonEngine();
var probabilityService = new MarketProbabilityService(poissonEngine);
var fairOddsService = new FairOddsService();
var recommendationService = new BetRecommendationService(
    expectedGoalsCalculator,
    probabilityService,
    fairOddsService,
    teamStrengthService,
    leagueConfigService);

var from = DateTime.UtcNow;
var to = from.AddHours(24);

Console.WriteLine($"Fetching fixtures between {from:u} and {to:u}...\n");
var fixtures = await apiProvider.GetFixturesAsync(from, to);

if (fixtures.Count == 0)
{
    Console.WriteLine("No fixtures returned by API-Football. Check your API key or date range.");
    return;
}

foreach (var fixture in fixtures)
{
    var odds = await apiProvider.GetOddsAsync(fixture);
    if (odds is null)
    {
        continue;
    }

    var recommendation = recommendationService.Evaluate(fixture, odds);
    if (recommendation.RecommendedMarkets.Count == 0)
    {
        continue;
    }

    PrintRecommendation(recommendation);
}

void PrintRecommendation(BetRecommendation rec)
{
    Console.WriteLine($"{rec.Fixture.League} | {rec.Fixture.HomeTeam} vs {rec.Fixture.AwayTeam} | Kickoff: {rec.Fixture.Kickoff:u}");
    Console.WriteLine($"Expected Goals: Home {rec.ExpectedGoals.Home:F2} | Away {rec.ExpectedGoals.Away:F2}");
    Console.WriteLine($"API Odds: H {rec.Odds.HomeWin:F2}  D {rec.Odds.Draw:F2}  A {rec.Odds.AwayWin:F2} | U2.5 {rec.Odds.Under2_5:F2} O2.5 {rec.Odds.Over2_5:F2} | BTTS {rec.Odds.BTTS_Yes:F2} / {rec.Odds.BTTS_No:F2}");
    Console.WriteLine("Model:");
    Console.WriteLine($"  P(Home) = {rec.Probabilities.HomeWin:P2} → Fair {rec.FairOdds.HomeWin:F2} → Edge {rec.Edges.HomeWin:+0.00;-0.00}");
    Console.WriteLine($"  P(Draw) = {rec.Probabilities.Draw:P2} → Fair {rec.FairOdds.Draw:F2} → Edge {rec.Edges.Draw:+0.00;-0.00}");
    Console.WriteLine($"  P(Away) = {rec.Probabilities.AwayWin:P2} → Fair {rec.FairOdds.AwayWin:F2} → Edge {rec.Edges.AwayWin:+0.00;-0.00}");
    Console.WriteLine($"  P(Under2.5) = {rec.Probabilities.Under2_5:P2} → Fair {rec.FairOdds.Under2_5:F2} → Edge {rec.Edges.Under2_5:+0.00;-0.00}");
    Console.WriteLine($"  P(Over2.5) = {rec.Probabilities.Over2_5:P2} → Fair {rec.FairOdds.Over2_5:F2} → Edge {rec.Edges.Over2_5:+0.00;-0.00}");
    Console.WriteLine($"  P(BTTS Yes) = {rec.Probabilities.BTTS_Yes:P2} → Fair {rec.FairOdds.BTTS_Yes:F2} → Edge {rec.Edges.BTTS_Yes:+0.00;-0.00}");
    Console.WriteLine($"  P(BTTS No) = {rec.Probabilities.BTTS_No:P2} → Fair {rec.FairOdds.BTTS_No:F2} → Edge {rec.Edges.BTTS_No:+0.00;-0.00}");

    Console.WriteLine("Recommended Bets (Edge > 0.02):");
    foreach (var market in rec.RecommendedMarkets)
    {
        Console.WriteLine($"  - {market}");
    }

    Console.WriteLine(new string('-', 80));
}
