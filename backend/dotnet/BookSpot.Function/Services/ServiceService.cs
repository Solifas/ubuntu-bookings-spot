using Amazon.DynamoDBv2.DataModel;
using BookSpot.Function.Models;

namespace BookSpot.Function.Services;

public class ServiceService
{
    private readonly IDynamoDBContext _context;

    public ServiceService(IDynamoDBContext context)
    {
        _context = context;
    }

    public Task<Service?> GetAsync(string id) => _context.LoadAsync<Service>(id);

    public Task SaveAsync(Service service) => _context.SaveAsync(service);

    public Task DeleteAsync(string id) => _context.DeleteAsync<Service>(id);
}
