using MediatR;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Queries.OrderQueries;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Results.ReadResults.OrderResults;
using OnionVb02.Application.Exceptions;
using OnionVb02.Contract.RepositoryInterfaces;
using OnionVb02.Domain.Entities;

namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Handlers.Read.Orders
{
    public class GetOrderQueryHandler : IRequestHandler<GetOrderQuery, List<GetOrderQueryResult>>
    {
        private readonly IOrderRepository _repository;

        public GetOrderQueryHandler(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GetOrderQueryResult>> Handle(GetOrderQuery request, CancellationToken cancellationToken)
        {
            List<Order> values = await _repository.GetAllWithDetailsAsync();
            if (values == null)
                throw new NotFoundException("Sipariş bulunamadı");
            return values.Select(x => new GetOrderQueryResult
            {
                Id = x.Id,
                ShippingAddress = x.ShippingAddress,
                AppUserId = x.AppUserId,
                CreatedDate = x.CreatedDate,
                TotalPrice = x.OrderDetails.Sum(d => d.UnitPrice * d.Quantity),
                AppUserName = x.AppUser.UserName,

                Items = x.OrderDetails.Select(d => new OrderItemListDto
                {
                    ProductId = d.ProductId,
                    ProductName = d.Product.ProductName,
                    UnitPrice = d.Product.UnitPrice,
                    Quantity = d.Quantity,
                }).ToList()


            }).ToList();
        }
    }
}
