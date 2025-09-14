using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Businesses.Commands;

public record DeleteBusinessCommand(string Id) : IRequest<bool>;

public class DeleteBusinessHandler : IRequestHandler<DeleteBusinessCommand, bool>
{
    private readonly BusinessService _businesses;
    public DeleteBusinessHandler(BusinessService businesses) => _businesses = businesses;

    public async Task<bool> Handle(DeleteBusinessCommand request, CancellationToken cancellationToken)
    {
        var existing = await _businesses.GetAsync(request.Id);
        if (existing is null) return false;
        await _businesses.DeleteAsync(request.Id);
        return true;
    }
}
