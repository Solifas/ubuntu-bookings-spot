using BookSpot.Function.Features.Bookings.Commands;
using BookSpot.Function.Features.Bookings.Queries;
using BookSpot.Function.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookSpot.Function.Controllers;

[ApiController]
[Route("bookings")]
public class BookingsController : ControllerBase
{
    private readonly IMediator _mediator;
    public BookingsController(IMediator mediator) => _mediator = mediator;

    [HttpGet("{id}")]
    public async Task<ActionResult<Booking>> Get(string id)
    {
        var booking = await _mediator.Send(new GetBookingQuery(id));
        return booking is null ? NotFound() : Ok(booking);
    }

    [HttpPost]
    public async Task<ActionResult<Booking>> Post([FromBody] CreateBookingCommand command)
    {
        var booking = await _mediator.Send(command);
        return CreatedAtAction(nameof(Get), new { id = booking.Id }, booking);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Booking>> Put(string id, [FromBody] UpdateBookingCommand command)
    {
        if (id != command.Id) return BadRequest("Id mismatch");
        var updated = await _mediator.Send(command);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _mediator.Send(new DeleteBookingCommand(id));
        return deleted ? NoContent() : NotFound();
    }
}
