namespace Bookstore.Models;

public class OrderItem
{
    public int BookId { get; set; }
    public Book Book { get; set; }
    public int Quantity { get; set; }

    public decimal GetTotal() => Book.Price * Quantity;
}