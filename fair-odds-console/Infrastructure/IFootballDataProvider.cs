using FairOddsConsole.Domain;

namespace FairOddsConsole.Infrastructure;

public interface IFootballDataProvider
{
    Task<List<Fixture>> GetFixturesAsync(DateTime from, DateTime to);
    Task<Odds?> GetOddsAsync(Fixture fx);
}
