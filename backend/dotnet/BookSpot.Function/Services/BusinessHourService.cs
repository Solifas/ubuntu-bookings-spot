using Amazon.DynamoDBv2.DataModel;
using BookSpot.Function.Models;

namespace BookSpot.Function.Services;

public class BusinessHourService
{
    private readonly IDynamoDBContext _context;

    public BusinessHourService(IDynamoDBContext context)
    {
        _context = context;
    }

    public Task<BusinessHour?> GetAsync(string id) => _context.LoadAsync<BusinessHour>(id);

    public Task SaveAsync(BusinessHour hour) => _context.SaveAsync(hour);

    public Task DeleteAsync(string id) => _context.DeleteAsync<BusinessHour>(id);
}
