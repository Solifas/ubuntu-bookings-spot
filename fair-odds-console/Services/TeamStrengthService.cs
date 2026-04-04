using FairOddsConsole.Domain;

namespace FairOddsConsole.Services;

public class TeamStrengthService
{
    private readonly Dictionary<string, TeamStrength> _strengths = new(StringComparer.OrdinalIgnoreCase)
    {
        ["Arsenal"] = new TeamStrength { Name = "Arsenal", AttackStrength = 1.35, DefenceStrength = 0.8 },
        ["Manchester City"] = new TeamStrength { Name = "Manchester City", AttackStrength = 1.4, DefenceStrength = 0.75 },
        ["Liverpool"] = new TeamStrength { Name = "Liverpool", AttackStrength = 1.35, DefenceStrength = 0.85 },
        ["Chelsea"] = new TeamStrength { Name = "Chelsea", AttackStrength = 1.15, DefenceStrength = 0.95 },
        ["Tottenham"] = new TeamStrength { Name = "Tottenham", AttackStrength = 1.2, DefenceStrength = 0.95 },
        ["Manchester United"] = new TeamStrength { Name = "Manchester United", AttackStrength = 1.2, DefenceStrength = 1.0 },
        ["Bayern Munich"] = new TeamStrength { Name = "Bayern Munich", AttackStrength = 1.45, DefenceStrength = 0.85 },
        ["Borussia Dortmund"] = new TeamStrength { Name = "Borussia Dortmund", AttackStrength = 1.3, DefenceStrength = 1.0 },
        ["PSV"] = new TeamStrength { Name = "PSV", AttackStrength = 1.25, DefenceStrength = 0.95 },
        ["Ajax"] = new TeamStrength { Name = "Ajax", AttackStrength = 1.2, DefenceStrength = 1.05 },
        ["Feyenoord"] = new TeamStrength { Name = "Feyenoord", AttackStrength = 1.25, DefenceStrength = 0.95 },
        ["Orlando Pirates"] = new TeamStrength { Name = "Orlando Pirates", AttackStrength = 1.05, DefenceStrength = 0.95 },
        ["Kaizer Chiefs"] = new TeamStrength { Name = "Kaizer Chiefs", AttackStrength = 1.0, DefenceStrength = 1.0 },
        ["LA Galaxy"] = new TeamStrength { Name = "LA Galaxy", AttackStrength = 1.1, DefenceStrength = 1.05 },
        ["Sacramento Republic"] = new TeamStrength { Name = "Sacramento Republic", AttackStrength = 1.05, DefenceStrength = 0.98 }
    };

    public TeamStrength GetStrength(string teamName)
    {
        if (_strengths.TryGetValue(teamName, out var strength))
        {
            return strength;
        }

        return new TeamStrength { Name = teamName, AttackStrength = 1.0, DefenceStrength = 1.0 };
    }
}
