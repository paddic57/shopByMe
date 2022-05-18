using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public class RepositoryBasketService : IBasketService
    {
        private readonly Database context;

        public RepositoryBasketService(Database context)
        {
            this.context = context; 
        } 

        public void clear()
        {
            int iduser = context.Users.First().Id;
            var filtered = context.BasketItems.Where(x => x.UserId == iduser);

            if (filtered.Any())
            {
                filtered.ToList().ForEach(x => context.BasketItems.Remove(x));
            }
            context.SaveChanges();
        }

        public IEnumerable<BasketItemDto> Delete(int bItem)
        {
            var basketItems = context.BasketItems.Where(x => x.Id == bItem).FirstOrDefault();
            if (basketItems == null)
                return null;

            context.BasketItems.Remove(basketItems);
            context.SaveChanges();

            var userBasket = this.context.BasketItems
               .Where(bi => bi.UserId == this.context.Users.First().Id)
               .Join(
               this.context.Products,
               bi => bi.ProductId,
               p => p.Id,
               (bi, p) => new BasketItemDto
               {
                   Id = bi.Id,
                   Name = p.Name,
                   Price = p.Price,
                   Count = bi.Count
               });


            return this.Get();

        }

        public IEnumerable<BasketItemDto> Get()
        {
            var user = context.Users.First();
            var userBasket = this.context.BasketItems
               .Where(bi => bi.UserId == this.context.Users.First().Id)
               .Join(
               this.context.Products,
               bi => bi.ProductId,
               p => p.Id,
               (bi, p) => new BasketItemDto
               {
                   Id = bi.Id,
                   Name = p.Name,
                   Price = p.Price,
                   Count = bi.Count
               });
            return userBasket;
            
        }

        public IEnumerable<BasketItemDto> Post(int productId, int count)
        {
            var user = context.Users.First();
            var product = context.Products.Where(x => x.Id == productId).FirstOrDefault();
            BasketItem toUpdate = context.BasketItems.Where(x => x.ProductId == productId).FirstOrDefault();

            if (toUpdate != null)
            {
                toUpdate.Count = toUpdate.Count + 1;
            }
            else
            {
                BasketItem toAdd = new BasketItem
                {
                    Count = count,
                    UserId = user.Id,
                    ProductId = product.Id,
                };

                context.BasketItems.Add(toAdd);
            }
            
            context.SaveChanges();
            return this.Get();
        }

        public IEnumerable<BasketItemDto> Put(int basketItemId, int count)
        {
            var user = context.Users.First();
            BasketItem toUpdate = context.BasketItems.Where(x => x.Id == basketItemId).FirstOrDefault();

            toUpdate.Count = count;
            context.SaveChanges();

            return this.Get();


        }
    }
}
