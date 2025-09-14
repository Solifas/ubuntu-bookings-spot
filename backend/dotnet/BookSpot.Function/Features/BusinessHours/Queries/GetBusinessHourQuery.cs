using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.BusinessHours.Queries;

public record GetBusinessHourQuery(string Id) : IRequest<BusinessHour?>;

public class GetBusinessHourHandler : IRequestHandler<GetBusinessHourQuery, BusinessHour?>
{
    private readonly BusinessHourService _hours;
    public GetBusinessHourHandler(BusinessHourService hours) => _hours = hours;

    public Task<BusinessHour?> Handle(GetBusinessHourQuery request, CancellationToken cancellationToken)
        => _hours.GetAsync(request.Id);
}
