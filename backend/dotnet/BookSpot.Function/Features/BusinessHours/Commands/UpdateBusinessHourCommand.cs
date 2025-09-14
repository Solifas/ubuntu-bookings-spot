using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.BusinessHours.Commands;

public record UpdateBusinessHourCommand(string Id, string BusinessId, int DayOfWeek, string OpenTime, string CloseTime, bool IsClosed) : IRequest<BusinessHour?>;

public class UpdateBusinessHourHandler : IRequestHandler<UpdateBusinessHourCommand, BusinessHour?>
{
    private readonly BusinessHourService _hours;
    public UpdateBusinessHourHandler(BusinessHourService hours) => _hours = hours;

    public async Task<BusinessHour?> Handle(UpdateBusinessHourCommand request, CancellationToken cancellationToken)
    {
        var existing = await _hours.GetAsync(request.Id);
        if (existing is null) return null;

        existing.BusinessId = request.BusinessId;
        existing.DayOfWeek = request.DayOfWeek;
        existing.OpenTime = request.OpenTime;
        existing.CloseTime = request.CloseTime;
        existing.IsClosed = request.IsClosed;

        await _hours.SaveAsync(existing);
        return existing;
    }
}
