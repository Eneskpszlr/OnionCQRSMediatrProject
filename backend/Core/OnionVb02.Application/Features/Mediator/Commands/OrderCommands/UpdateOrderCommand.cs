using MediatR;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Results.WriteResults.OrderResults;
using OnionVb02.Application.Features.Mediator.Dtos.Orders;

namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Commands.OrderCommands
{
    public class UpdateOrderCommand : IRequest<UpdateOrderCommandResult>
    {
        public int Id { get; set; }
        public string ShippingAddress { get; set; }
        public int AppUserId { get; set; }

        public List<OrderItemDto> Items { get; set; }
    }
}
