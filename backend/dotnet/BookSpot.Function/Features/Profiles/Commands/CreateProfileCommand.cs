using BookSpot.Function.Models;
using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Profiles.Commands;

public record CreateProfileCommand(string Email, string UserType) : IRequest<Profile>;

public class CreateProfileHandler : IRequestHandler<CreateProfileCommand, Profile>
{
    private readonly ProfileService _profiles;
    public CreateProfileHandler(ProfileService profiles) => _profiles = profiles;

    public async Task<Profile> Handle(CreateProfileCommand request, CancellationToken cancellationToken)
    {
        var profile = new Profile
        {
            Id = Guid.NewGuid().ToString(),
            Email = request.Email,
            UserType = request.UserType,
            CreatedAt = DateTime.UtcNow
        };

        await _profiles.SaveAsync(profile);
        return profile;
    }
}
