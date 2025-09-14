using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Bookings.Commands;

public record CreateBookingCommand(string ServiceId, string ClientId, string ProviderId, DateTime StartTime, DateTime EndTime) : IRequest<Booking>;

public class CreateBookingHandler : IRequestHandler<CreateBookingCommand, Booking>
{
    private readonly BookingService _bookings;
    public CreateBookingHandler(BookingService bookings) => _bookings = bookings;

    public async Task<Booking> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
    {
        var booking = new Booking
        {
            Id = Guid.NewGuid().ToString(),
            ServiceId = request.ServiceId,
            ClientId = request.ClientId,
            ProviderId = request.ProviderId,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            Status = "pending",
            CreatedAt = DateTime.UtcNow
        };

        await _bookings.SaveAsync(booking);
        return booking;
    }
}
