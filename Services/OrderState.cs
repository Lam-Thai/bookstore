using Bookstore.Models;

namespace Bookstore.Services;

public class OrderState
{
    public Order Order { get; set; } = new();

    public event Action OnChange;

    public OrderState()
    {
        Order.OrderItems = new List<OrderItem>();
    }

    public void AddItem(OrderItem item) // Add book to cart
    {
        var existingItem = Order.OrderItems
            .FirstOrDefault(i => i.BookId == item.BookId);

        if (existingItem is not null)
        {
            existingItem.Quantity += item.Quantity;
        }
        else
        {
            Order.OrderItems.Add(item);
        }

        OnChange?.Invoke();
    }

    public void RemoveItem(OrderItem item)  // Remove book to cart
    {
        Order.OrderItems.Remove(item);
        OnChange?.Invoke();
    }

    public void ResetOrder()  // after placing an order
    {
        Order = new Order
        {
            OrderItems = new List<OrderItem>()
        };
        OnChange?.Invoke();
    }
}