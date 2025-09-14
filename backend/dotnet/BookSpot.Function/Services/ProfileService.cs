using Amazon.DynamoDBv2.DataModel;
using BookSpot.Function.Models;

namespace BookSpot.Function.Services;

public class ProfileService
{
    private readonly IDynamoDBContext _context;

    public ProfileService(IDynamoDBContext context)
    {
        _context = context;
    }

    public Task<Profile?> GetAsync(string id) => _context.LoadAsync<Profile>(id);

    public Task SaveAsync(Profile profile) => _context.SaveAsync(profile);

    public Task DeleteAsync(string id) => _context.DeleteAsync<Profile>(id);
}
