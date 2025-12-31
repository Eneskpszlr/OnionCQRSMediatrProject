namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Results.ReadResults.OrderResults
{
    public class GetOrderQueryResult
    {
        public int Id { get; set; }
        public string ShippingAddress { get; set; }
        public int AppUserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal TotalPrice { get; set; }

        public List<OrderItemListDto> Items { get; set; }
    }

    public class OrderItemListDto
    {
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        // public int Quantity { get; set; }
    }
}
