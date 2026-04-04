using FairOddsConsole.Domain;

namespace FairOddsConsole.Services;

public class FairOddsService
{
    public MarketFairOdds CalculateFairOdds(MarketProbabilities probabilities)
    {
        return new MarketFairOdds
        {
            HomeWin = SafeOdds(probabilities.HomeWin),
            Draw = SafeOdds(probabilities.Draw),
            AwayWin = SafeOdds(probabilities.AwayWin),
            Under2_5 = SafeOdds(probabilities.Under2_5),
            Over2_5 = SafeOdds(probabilities.Over2_5),
            BTTS_Yes = SafeOdds(probabilities.BTTS_Yes),
            BTTS_No = SafeOdds(probabilities.BTTS_No)
        };
    }

    public MarketEdges CalculateEdges(MarketProbabilities modelProbabilities, Odds bookmakerOdds)
    {
        double Implied(double odd) => odd > 0 ? 1d / odd : 0d;

        return new MarketEdges
        {
            HomeWin = modelProbabilities.HomeWin - Implied(bookmakerOdds.HomeWin),
            Draw = modelProbabilities.Draw - Implied(bookmakerOdds.Draw),
            AwayWin = modelProbabilities.AwayWin - Implied(bookmakerOdds.AwayWin),
            Under2_5 = modelProbabilities.Under2_5 - Implied(bookmakerOdds.Under2_5),
            Over2_5 = modelProbabilities.Over2_5 - Implied(bookmakerOdds.Over2_5),
            BTTS_Yes = modelProbabilities.BTTS_Yes - Implied(bookmakerOdds.BTTS_Yes),
            BTTS_No = modelProbabilities.BTTS_No - Implied(bookmakerOdds.BTTS_No)
        };
    }

    private static double SafeOdds(double probability)
    {
        return probability > 0 ? 1d / probability : double.PositiveInfinity;
    }
}
