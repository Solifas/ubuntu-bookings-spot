using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Bookings.Commands;

public record UpdateBookingCommand(string Id, DateTime StartTime, DateTime EndTime, string Status) : IRequest<Booking?>;

public class UpdateBookingHandler : IRequestHandler<UpdateBookingCommand, Booking?>
{
    private readonly BookingService _bookings;
    public UpdateBookingHandler(BookingService bookings) => _bookings = bookings;

    public async Task<Booking?> Handle(UpdateBookingCommand request, CancellationToken cancellationToken)
    {
        var existing = await _bookings.GetAsync(request.Id);
        if (existing is null) return null;

        existing.StartTime = request.StartTime;
        existing.EndTime = request.EndTime;
        existing.Status = request.Status;

        await _bookings.SaveAsync(existing);
        return existing;
    }
}
