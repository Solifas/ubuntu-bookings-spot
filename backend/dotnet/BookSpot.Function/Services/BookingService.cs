using Amazon.DynamoDBv2.DataModel;
using BookSpot.Function.Models;

namespace BookSpot.Function.Services;

public class BookingService
{
    private readonly IDynamoDBContext _context;

    public BookingService(IDynamoDBContext context)
    {
        _context = context;
    }

    public Task<Booking?> GetAsync(string id) => _context.LoadAsync<Booking>(id);

    public Task SaveAsync(Booking booking) => _context.SaveAsync(booking);

    public Task DeleteAsync(string id) => _context.DeleteAsync<Booking>(id);
}
