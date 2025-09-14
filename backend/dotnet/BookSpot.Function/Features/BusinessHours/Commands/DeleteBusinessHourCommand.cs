using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.BusinessHours.Commands;

public record DeleteBusinessHourCommand(string Id) : IRequest<bool>;

public class DeleteBusinessHourHandler : IRequestHandler<DeleteBusinessHourCommand, bool>
{
    private readonly BusinessHourService _hours;
    public DeleteBusinessHourHandler(BusinessHourService hours) => _hours = hours;

    public async Task<bool> Handle(DeleteBusinessHourCommand request, CancellationToken cancellationToken)
    {
        var existing = await _hours.GetAsync(request.Id);
        if (existing is null) return false;
        await _hours.DeleteAsync(request.Id);
        return true;
    }
}
