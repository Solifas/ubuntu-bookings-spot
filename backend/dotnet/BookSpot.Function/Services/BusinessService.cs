using Amazon.DynamoDBv2.DataModel;
using BookSpot.Function.Models;

namespace BookSpot.Function.Services;

public class BusinessService
{
    private readonly IDynamoDBContext _context;

    public BusinessService(IDynamoDBContext context)
    {
        _context = context;
    }

    public Task<Business?> GetAsync(string id) => _context.LoadAsync<Business>(id);

    public Task SaveAsync(Business business) => _context.SaveAsync(business);

    public Task DeleteAsync(string id) => _context.DeleteAsync<Business>(id);
}
