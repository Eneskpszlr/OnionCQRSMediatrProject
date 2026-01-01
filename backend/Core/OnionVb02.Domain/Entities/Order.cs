using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnionVb02.Domain.Entities
{
    public class Order : BaseEntity
    {
       
        public string ShippingAddress { get; set; }
        public int AppUserId { get; set; }
        //Relational Properties
        public virtual AppUser AppUser { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }


        public Order()
        {
            OrderDetails = new List<OrderDetail>();
            CreatedDate = DateTime.Now;
        }
    }
}
