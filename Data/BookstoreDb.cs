using Microsoft.EntityFrameworkCore;
using Bookstore.Models;

namespace Bookstore.Data;

public class BookstoreDb(DbContextOptions<BookstoreDb> options) : DbContext(options)
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Order>()
            .OwnsMany(e => e.OrderItems, orderItems =>
            {
                orderItems.WithOwner().HasForeignKey("OrderId");
                orderItems.HasKey("OrderId", nameof(OrderItem.BookId));

                orderItems.HasOne(item => item.Book)
                    .WithMany()
                    .HasForeignKey(item => item.BookId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
    }
}