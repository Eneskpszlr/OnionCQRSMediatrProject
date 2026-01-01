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
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;

        public UpdateOrderCommandHandler(IOrderRepository orderRepository, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }

        public async Task<UpdateOrderCommandResult> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = await _orderRepository.GetByIdWithDetailsAsync(request.Id);

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
                    var product = await _productRepository.GetByIdAsync(itemDto.ProductId);

                    if (product != null)
                    {
                        entity.OrderDetails.Add(new OrderDetail
                        {
                            ProductId = itemDto.ProductId,
                            Quantity = itemDto.Quantity,
                            UnitPrice = product.UnitPrice, // Güncel fiyat
                            Order = entity
                        });
                    }
                }
            }

            await _orderRepository.SaveChangesAsync();

            return new UpdateOrderCommandResult
            {
                Success = true,
                EntityId = entity.Id
            };
        }
    }
}
