using FairOddsConsole.Domain;

namespace FairOddsConsole.Services;

public class ExpectedGoalsCalculator
{
    public ExpectedGoals Calculate(TeamStrength home, TeamStrength away, LeagueConfig leagueConfig)
    {
        var lambdaHome = leagueConfig.AvgLeagueGoals * home.AttackStrength * away.DefenceStrength * leagueConfig.HomeAdvantageMultiplier;
        var lambdaAway = leagueConfig.AvgLeagueGoals * away.AttackStrength * home.DefenceStrength;
        return new ExpectedGoals(lambdaHome, lambdaAway);
    }
}
