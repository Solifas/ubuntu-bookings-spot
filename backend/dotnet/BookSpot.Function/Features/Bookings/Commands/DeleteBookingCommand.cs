using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Bookings.Commands;

public record DeleteBookingCommand(string Id) : IRequest<bool>;

public class DeleteBookingHandler : IRequestHandler<DeleteBookingCommand, bool>
{
    private readonly BookingService _bookings;
    public DeleteBookingHandler(BookingService bookings) => _bookings = bookings;

    public async Task<bool> Handle(DeleteBookingCommand request, CancellationToken cancellationToken)
    {
        var existing = await _bookings.GetAsync(request.Id);
        if (existing is null) return false;
        await _bookings.DeleteAsync(request.Id);
        return true;
    }
}
