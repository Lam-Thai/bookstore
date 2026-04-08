namespace Bookstore.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public bool IsCanceled { get; set; }
    public string CancelReason { get; set; } = string.Empty;
    public DateTime CanceledAt { get; set; }
    public List<OrderItem> OrderItems { get; set; }

    public decimal GetTotal() => OrderItems.Sum(item => item.GetTotal());
}