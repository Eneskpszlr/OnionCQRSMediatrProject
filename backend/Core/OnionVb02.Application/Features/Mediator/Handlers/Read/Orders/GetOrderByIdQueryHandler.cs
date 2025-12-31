using MediatR;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Queries.OrderQueries;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Results.ReadResults.OrderResults;
using OnionVb02.Application.Exceptions;
using OnionVb02.Contract.RepositoryInterfaces;
using OnionVb02.Domain.Entities;

namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Handlers.Read.Orders
{
    public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, GetOrderByIdQueryResult>
    {
        private readonly IOrderRepository _repository;
        public GetOrderByIdQueryHandler(IOrderRepository repository)
        {
            _repository = repository;
        }
        public async Task<GetOrderByIdQueryResult> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
        {
            Order? value = await _repository.GetByIdWithDetailsAsync(request.Id);
            if (value == null)
                throw new NotFoundException("Sipariş bulunamadı");
            return new GetOrderByIdQueryResult
            {
                Id = value.Id,
                ShippingAddress = value.ShippingAddress,
                AppUserId = value.AppUserId,
                CreatedDate = value.CreatedDate,


                Items = value.OrderDetails.Select(x => new OrderItemQueryResult
                {
                    ProductId = x.ProductId,
                    ProductName = x.Product.ProductName,
                    UnitPrice = x.Product.UnitPrice,
                }).ToList()
            };
        }
    }
}
