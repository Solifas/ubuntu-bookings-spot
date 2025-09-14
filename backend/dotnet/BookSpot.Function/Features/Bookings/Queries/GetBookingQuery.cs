using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Bookings.Queries;

public record GetBookingQuery(string Id) : IRequest<Booking?>;

public class GetBookingHandler : IRequestHandler<GetBookingQuery, Booking?>
{
    private readonly BookingService _bookings;
    public GetBookingHandler(BookingService bookings) => _bookings = bookings;

    public Task<Booking?> Handle(GetBookingQuery request, CancellationToken cancellationToken)
        => _bookings.GetAsync(request.Id);
}
