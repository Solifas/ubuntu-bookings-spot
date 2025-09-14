using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Profiles.Queries;

public record GetProfileQuery(string Id) : IRequest<Profile?>;

public class GetProfileHandler : IRequestHandler<GetProfileQuery, Profile?>
{
    private readonly ProfileService _profiles;
    public GetProfileHandler(ProfileService profiles) => _profiles = profiles;

    public Task<Profile?> Handle(GetProfileQuery request, CancellationToken cancellationToken) =>
        _profiles.GetAsync(request.Id);
}
