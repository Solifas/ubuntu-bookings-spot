using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Profiles.Commands;

public record UpdateProfileCommand(string Id, string Email, string UserType) : IRequest<Profile?>;

public class UpdateProfileHandler : IRequestHandler<UpdateProfileCommand, Profile?>
{
    private readonly ProfileService _profiles;
    public UpdateProfileHandler(ProfileService profiles) => _profiles = profiles;

    public async Task<Profile?> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        var existing = await _profiles.GetAsync(request.Id);
        if (existing == null)
        {
            return null;
        }

        existing.Email = request.Email;
        existing.UserType = request.UserType;
        await _profiles.SaveAsync(existing);
        return existing;
    }
}
