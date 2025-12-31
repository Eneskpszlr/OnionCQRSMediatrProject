namespace OnionVb02.Application.CqrsAndMediatr.Mediator.Results.ReadResults.OrderResults
{
    public class GetOrderByIdQueryResult
    {
        public int Id { get; set; }
        public string ShippingAddress { get; set; }
        public int AppUserId { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<OrderItemQueryResult> Items { get; set; }
    }

    public class OrderItemQueryResult
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        // public int Quantity { get; set; }
    }
}
