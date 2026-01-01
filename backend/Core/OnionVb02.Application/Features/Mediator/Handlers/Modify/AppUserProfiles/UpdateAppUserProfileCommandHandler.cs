using MediatR;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Commands.AppUserProfileCommands;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Results.WriteResults.AppUserProfileResults;
using OnionVb02.Application.Exceptions;
using OnionVb02.Contract.RepositoryInterfaces;
using OnionVb02.Domain.Enums;
using OnionVb02.Domain.Interfaces;

namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Handlers.Modify.AppUserProfiles
{
    public class UpdateAppUserProfileCommandHandler : IRequestHandler<UpdateAppUserProfileCommand, UpdateAppUserProfileCommandResult>
    {
        private readonly IAppUserProfileRepository _repository;
        public UpdateAppUserProfileCommandHandler(IAppUserProfileRepository repository)
        {
            _repository = repository;
        }
        public async Task<UpdateAppUserProfileCommandResult> Handle(UpdateAppUserProfileCommand request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.Id);
            if (value == null)
                throw new NotFoundException("Kullanıcı Profili bulunamadı.");
            value.FirstName = request.FirstName;
            value.LastName = request.LastName;
            //value.AppUserId = request.AppUserId;
            value.Status = DataStatus.Updated;
            value.UpdatedDate = DateTime.Now;
            await _repository.SaveChangesAsync();
            return new UpdateAppUserProfileCommandResult
            {
                EntityId = value.Id
            };
        }
    }
}
