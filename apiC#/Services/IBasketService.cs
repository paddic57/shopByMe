using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IBasketService
    {
        public IEnumerable<BasketItemDto> Get();

        public IEnumerable<BasketItemDto> Post(int productId, int count);

        public IEnumerable<BasketItemDto> Put(int basketItemId, int count);

        public IEnumerable<BasketItemDto> Delete(int basketItem);

        public void clear();

    }
}
