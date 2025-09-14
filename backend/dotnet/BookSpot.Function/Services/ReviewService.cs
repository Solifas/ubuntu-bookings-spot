using Amazon.DynamoDBv2.DataModel;
using BookSpot.Function.Models;

namespace BookSpot.Function.Services;

public class ReviewService
{
    private readonly IDynamoDBContext _context;

    public ReviewService(IDynamoDBContext context)
    {
        _context = context;
    }

    public Task<Review?> GetAsync(string id) => _context.LoadAsync<Review>(id);

    public Task SaveAsync(Review review) => _context.SaveAsync(review);

    public Task DeleteAsync(string id) => _context.DeleteAsync<Review>(id);
}
