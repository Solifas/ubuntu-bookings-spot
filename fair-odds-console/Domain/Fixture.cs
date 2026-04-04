namespace FairOddsConsole.Domain;

public class Fixture
{
    public string League { get; set; } = string.Empty;
    public string HomeTeam { get; set; } = string.Empty;
    public string AwayTeam { get; set; } = string.Empty;
    public DateTime Kickoff { get; set; }
    public int? ApiFixtureId { get; set; }
}
