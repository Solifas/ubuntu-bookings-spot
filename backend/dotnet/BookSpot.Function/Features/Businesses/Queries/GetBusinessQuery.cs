using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Businesses.Queries;

public record GetBusinessQuery(string Id) : IRequest<Business?>;

public class GetBusinessHandler : IRequestHandler<GetBusinessQuery, Business?>
{
    private readonly BusinessService _businesses;
    public GetBusinessHandler(BusinessService businesses) => _businesses = businesses;

    public Task<Business?> Handle(GetBusinessQuery request, CancellationToken cancellationToken)
        => _businesses.GetAsync(request.Id);
}
