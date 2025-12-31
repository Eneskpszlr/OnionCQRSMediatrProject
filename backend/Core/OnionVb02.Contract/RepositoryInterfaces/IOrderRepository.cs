using OnionVb02.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnionVb02.Contract.RepositoryInterfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Order> GetByIdWithDetailsAsync(int id);

        Task<List<Order>> GetAllWithDetailsAsync();
    }
}
