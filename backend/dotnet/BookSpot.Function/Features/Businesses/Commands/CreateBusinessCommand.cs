using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Businesses.Commands;

public record CreateBusinessCommand(string ProviderId, string BusinessName, string City) : IRequest<Business>;

public class CreateBusinessHandler : IRequestHandler<CreateBusinessCommand, Business>
{
    private readonly BusinessService _businesses;
    public CreateBusinessHandler(BusinessService businesses) => _businesses = businesses;

    public async Task<Business> Handle(CreateBusinessCommand request, CancellationToken cancellationToken)
    {
        var business = new Business
        {
            Id = Guid.NewGuid().ToString(),
            ProviderId = request.ProviderId,
            BusinessName = request.BusinessName,
            City = request.City,
            CreatedAt = DateTime.UtcNow
        };

        await _businesses.SaveAsync(business);
        return business;
    }
}
