using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Reviews.Queries;

public record GetReviewQuery(string Id) : IRequest<Review?>;

public class GetReviewHandler : IRequestHandler<GetReviewQuery, Review?>
{
    private readonly ReviewService _reviews;
    public GetReviewHandler(ReviewService reviews) => _reviews = reviews;

    public Task<Review?> Handle(GetReviewQuery request, CancellationToken cancellationToken)
        => _reviews.GetAsync(request.Id);
}
