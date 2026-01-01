using MediatR;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Commands.OrderCommands;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Results.WriteResults.OrderResults;
using OnionVb02.Application.Exceptions;
using OnionVb02.Contract.RepositoryInterfaces;

namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Handlers.Modify.Orders
{
    public class RemoveOrderCommandHandler : IRequestHandler<RemoveOrderCommand, RemoveOrderCommandResult>
    {
        private readonly IOrderRepository _repository;
        public RemoveOrderCommandHandler(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<RemoveOrderCommandResult> Handle(RemoveOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = await _repository.GetByIdAsync(request.Id);

            if (entity == null)
                throw new NotFoundException("Sipariş bulunamadı.");

            await _repository.DeleteAsync(entity);

            return new RemoveOrderCommandResult
            {
                Success = true,
                EntityId = request.Id
            };
        }
    }
}
