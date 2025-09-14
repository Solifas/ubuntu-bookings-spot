using BookSpot.Function.Services;
using MediatR;

namespace BookSpot.Function.Features.Profiles.Commands;

public record DeleteProfileCommand(string Id) : IRequest<bool>;

public class DeleteProfileHandler : IRequestHandler<DeleteProfileCommand, bool>
{
    private readonly ProfileService _profiles;
    public DeleteProfileHandler(ProfileService profiles) => _profiles = profiles;

    public async Task<bool> Handle(DeleteProfileCommand request, CancellationToken cancellationToken)
    {
        var existing = await _profiles.GetAsync(request.Id);
        if (existing == null)
        {
            return false;
        }

        await _profiles.DeleteAsync(request.Id);
        return true;
    }
}
