using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Reviews.Commands;

public record DeleteReviewCommand(string Id) : IRequest<bool>;

public class DeleteReviewHandler : IRequestHandler<DeleteReviewCommand, bool>
{
    private readonly ReviewService _reviews;
    public DeleteReviewHandler(ReviewService reviews) => _reviews = reviews;

    public async Task<bool> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
    {
        var existing = await _reviews.GetAsync(request.Id);
        if (existing is null) return false;
        await _reviews.DeleteAsync(request.Id);
        return true;
    }
}
