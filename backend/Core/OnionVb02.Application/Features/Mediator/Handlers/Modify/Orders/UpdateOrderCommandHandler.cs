    using MediatR;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Commands.OrderCommands;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Results.WriteResults.OrderResults;
using OnionVb02.Application.Exceptions;
using OnionVb02.Contract.RepositoryInterfaces;
using OnionVb02.Domain.Entities;

namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Handlers.Modify.Orders
{
    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand, UpdateOrderCommandResult>
    {
        private readonly IOrderRepository _repository;
        public UpdateOrderCommandHandler(IOrderRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<UpdateOrderCommandResult> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = await _repository.GetByIdWithDetailsAsync(request.Id);

            if (entity == null)
                throw new NotFoundException("Sipariş bulunamadı.");

            entity.ShippingAddress = request.ShippingAddress;
            entity.AppUserId = request.AppUserId;
            entity.UpdatedDate = DateTime.Now;
            entity.Status = Domain.Enums.DataStatus.Updated;

            // 3. Detayları Yönet (Aggregate Mantığı)
            if (request.Items != null)
            {
                // Eski detayları bellekten ve ilişkiden kopar
                entity.OrderDetails.Clear();

                // Yeni listeyi ekle
                foreach (var itemDto in request.Items)
                {
                    entity.OrderDetails.Add(new OrderDetail
                    {
                        ProductId = itemDto.ProductId,
                        // Quantity = itemDto.Quantity, // İleride
                        Order = entity
                    });
                }
            }

            await _repository.SaveChangesAsync();

            return new UpdateOrderCommandResult
            {
                Success = true,
                EntityId = entity.Id
            };
        }
    }
}
