namespace FairOddsConsole.Domain;

public class BetRecommendation
{
    public Fixture Fixture { get; set; } = new();
    public Odds Odds { get; set; } = new();
    public MarketProbabilities Probabilities { get; set; } = new();
    public MarketFairOdds FairOdds { get; set; } = new();
    public MarketEdges Edges { get; set; } = new();
    public List<string> RecommendedMarkets { get; set; } = new();
    public ExpectedGoals ExpectedGoals { get; set; } = new(0, 0);
}
