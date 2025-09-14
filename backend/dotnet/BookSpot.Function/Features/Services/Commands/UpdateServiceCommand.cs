using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Services.Commands;

public record UpdateServiceCommand(string Id, string BusinessId, string Name, decimal Price, int DurationMinutes) : IRequest<Service?>;

public class UpdateServiceHandler : IRequestHandler<UpdateServiceCommand, Service?>
{
    private readonly ServiceService _services;
    public UpdateServiceHandler(ServiceService services) => _services = services;

    public async Task<Service?> Handle(UpdateServiceCommand request, CancellationToken cancellationToken)
    {
        var existing = await _services.GetAsync(request.Id);
        if (existing is null) return null;

        existing.BusinessId = request.BusinessId;
        existing.Name = request.Name;
        existing.Price = request.Price;
        existing.DurationMinutes = request.DurationMinutes;

        await _services.SaveAsync(existing);
        return existing;
    }
}
