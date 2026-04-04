using FairOddsConsole.Domain;

namespace FairOddsConsole.Services;

public class MarketProbabilityService
{
    private readonly PoissonEngine _poissonEngine;

    public MarketProbabilityService(PoissonEngine poissonEngine)
    {
        _poissonEngine = poissonEngine;
    }

    public MarketProbabilities Calculate(double lambdaHome, double lambdaAway)
    {
        double homeWin = 0, draw = 0, awayWin = 0;
        double under2_5 = 0, over2_5 = 0;
        double bttsYes = 0, bttsNo = 0;

        const int maxGoals = 6;
        for (var homeGoals = 0; homeGoals <= maxGoals; homeGoals++)
        {
            var pHome = _poissonEngine.PoissonProbability(homeGoals, lambdaHome);
            for (var awayGoals = 0; awayGoals <= maxGoals; awayGoals++)
            {
                var pAway = _poissonEngine.PoissonProbability(awayGoals, lambdaAway);
                var joint = pHome * pAway;

                if (homeGoals > awayGoals) homeWin += joint;
                else if (homeGoals == awayGoals) draw += joint;
                else awayWin += joint;

                if (homeGoals + awayGoals <= 2) under2_5 += joint;
                else over2_5 += joint;

                if (homeGoals > 0 && awayGoals > 0) bttsYes += joint;
                else bttsNo += joint;
            }
        }

        Normalize(ref homeWin, ref draw, ref awayWin);
        Normalize(ref under2_5, ref over2_5);
        Normalize(ref bttsYes, ref bttsNo);

        return new MarketProbabilities
        {
            HomeWin = homeWin,
            Draw = draw,
            AwayWin = awayWin,
            Under2_5 = under2_5,
            Over2_5 = over2_5,
            BTTS_Yes = bttsYes,
            BTTS_No = bttsNo
        };
    }

    private static void Normalize(ref double a, ref double b)
    {
        var total = a + b;
        if (total <= 0) return;
        a /= total;
        b /= total;
    }

    private static void Normalize(ref double a, ref double b, ref double c)
    {
        var total = a + b + c;
        if (total <= 0) return;
        a /= total;
        b /= total;
        c /= total;
    }
}
