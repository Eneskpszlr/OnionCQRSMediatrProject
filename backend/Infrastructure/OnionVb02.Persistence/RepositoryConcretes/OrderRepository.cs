using Microsoft.EntityFrameworkCore;
using OnionVb02.Contract.RepositoryInterfaces;
using OnionVb02.Domain.Entities;
using OnionVb02.Persistence.ContextClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnionVb02.Persistence.RepositoryConcretes
{
    public class OrderRepository(MyContext context) : BaseRepository<Order>(context),IOrderRepository
    {
        public async Task<Order> GetByIdWithDetailsAsync(int id)
        {
            // Burada Include yaparak detayları da yüklüyoruz
            return await _context.Orders
                                 .Include(x => x.OrderDetails)
                                 .ThenInclude(x => x.Product)
                                 .Include(x => x.AppUser)
                                 .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Order>> GetAllWithDetailsAsync()
        {
            return await _context.Orders
                                 .Include(x => x.OrderDetails)       // Detay tablosuna git
                                 .ThenInclude(x => x.Product)        // Oradan Ürün tablosuna git (İsim için)
                                 .Include(x => x.AppUser)
                                 .OrderByDescending(x => x.CreatedDate) // Genelde en son sipariş en üste gelir
                                 .ToListAsync();
        }
    }
}
