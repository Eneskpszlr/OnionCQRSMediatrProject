using MediatR;
using OnionVb02.Application.CqrsAndMediatr.Mediator.Results.WriteResults.OrderResults;
using OnionVb02.Application.Features.Mediator.Dtos.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Commands.OrderCommands
{
    public class CreateOrderCommand : IRequest<CreateOrderCommandResult>
    {
        public string ShippingAddress { get; set; }
        public int AppUserId { get; set; }

        // Frontend'den gelen ürün listesi (Aggregate Mantığı)
        public List<OrderItemDto> Items { get; set; }
    }
}
