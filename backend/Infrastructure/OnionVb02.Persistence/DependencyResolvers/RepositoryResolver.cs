using Microsoft.Extensions.DependencyInjection;
using OnionVb02.Contract.RepositoryInterfaces;
using OnionVb02.Persistence.RepositoryConcretes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnionVb02.Persistence.DependencyResolvers
{
 
    public static class RepositoryResolver
    {
        public static void AddRepositoryService(this IServiceCollection services)
        {
            //services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>)); //Eger BaseRepository class'ınız abstract degilse ve generic ise ve bununla birlikte onu middleware servislerine eklemek istiyorsanız bu ifadeyi kullanırsınız...

            services.AddScoped<IAppUserRepository, AppUserRepository>();
            services.AddScoped<IAppUserProfileRepository,AppUserProfileRepository>();
            services.AddScoped<ICategoryRepository,CategoryRepository>();
            services.AddScoped<IProductRepository,ProductRepository>();
            services.AddScoped<IOrderRepository,OrderRepository>();
        
          
        }
    }
}
