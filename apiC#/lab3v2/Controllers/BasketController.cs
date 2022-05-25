using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using System.Collections.Generic;

namespace lab3v2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BasketController : ControllerBase
    {
        private IBasketService iBasketService;
        public BasketController(IBasketService iBasketService)
        {
            this.iBasketService = iBasketService;
        }
        [HttpDelete("clear")]
        public void clear()
        {
            iBasketService.clear();
        }
        [HttpGet]
        public IEnumerable<BasketItemDto> Get()
        {
            return iBasketService.Get();
        }
        [HttpPost("{id}")]
        public IEnumerable<BasketItemDto> Post(int id, [FromBody] int count)
        {
            return iBasketService.Post(id, count);
        }
        [HttpDelete("{id}")] 
        public IEnumerable<BasketItemDto> Delete(int id) 
        {
            return iBasketService.Delete(id);
        }
        [HttpPut("{id}")]
        public IEnumerable<BasketItemDto> Put(int id, [FromQuery] int count)
        {
            return iBasketService.Put(id, count);
        }
        


    }
}
