using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Services.Queries;

public record GetServiceQuery(string Id) : IRequest<Service?>;

public class GetServiceHandler : IRequestHandler<GetServiceQuery, Service?>
{
    private readonly ServiceService _services;
    public GetServiceHandler(ServiceService services) => _services = services;

    public Task<Service?> Handle(GetServiceQuery request, CancellationToken cancellationToken)
        => _services.GetAsync(request.Id);
}
