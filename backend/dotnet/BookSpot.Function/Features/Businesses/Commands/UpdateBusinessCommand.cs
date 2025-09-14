using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Businesses.Commands;

public record UpdateBusinessCommand(string Id, string ProviderId, string BusinessName, string City, bool IsActive) : IRequest<Business?>;

public class UpdateBusinessHandler : IRequestHandler<UpdateBusinessCommand, Business?>
{
    private readonly BusinessService _businesses;
    public UpdateBusinessHandler(BusinessService businesses) => _businesses = businesses;

    public async Task<Business?> Handle(UpdateBusinessCommand request, CancellationToken cancellationToken)
    {
        var existing = await _businesses.GetAsync(request.Id);
        if (existing is null) return null;

        existing.ProviderId = request.ProviderId;
        existing.BusinessName = request.BusinessName;
        existing.City = request.City;
        existing.IsActive = request.IsActive;

        await _businesses.SaveAsync(existing);
        return existing;
    }
}
