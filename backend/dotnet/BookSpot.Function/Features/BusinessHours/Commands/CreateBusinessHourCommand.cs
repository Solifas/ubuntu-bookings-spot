using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.BusinessHours.Commands;

public record CreateBusinessHourCommand(string BusinessId, int DayOfWeek, string OpenTime, string CloseTime, bool IsClosed) : IRequest<BusinessHour>;

public class CreateBusinessHourHandler : IRequestHandler<CreateBusinessHourCommand, BusinessHour>
{
    private readonly BusinessHourService _hours;
    public CreateBusinessHourHandler(BusinessHourService hours) => _hours = hours;

    public async Task<BusinessHour> Handle(CreateBusinessHourCommand request, CancellationToken cancellationToken)
    {
        var hour = new BusinessHour
        {
            Id = Guid.NewGuid().ToString(),
            BusinessId = request.BusinessId,
            DayOfWeek = request.DayOfWeek,
            OpenTime = request.OpenTime,
            CloseTime = request.CloseTime,
            IsClosed = request.IsClosed
        };

        await _hours.SaveAsync(hour);
        return hour;
    }
}
