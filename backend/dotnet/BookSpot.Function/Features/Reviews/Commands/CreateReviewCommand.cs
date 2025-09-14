using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Reviews.Commands;

public record CreateReviewCommand(string BookingId, int Rating, string Comment) : IRequest<Review>;

public class CreateReviewHandler : IRequestHandler<CreateReviewCommand, Review>
{
    private readonly ReviewService _reviews;
    public CreateReviewHandler(ReviewService reviews) => _reviews = reviews;

    public async Task<Review> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var review = new Review
        {
            Id = Guid.NewGuid().ToString(),
            BookingId = request.BookingId,
            Rating = request.Rating,
            Comment = request.Comment
        };

        await _reviews.SaveAsync(review);
        return review;
    }
}
