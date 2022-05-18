using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;


namespace lab3v2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        IProductsService iproductsService;
        public ProductsController(IProductsService iproductsService)
        {
            this.iproductsService = iproductsService;
        }
        [HttpGet]
        public PaginatedData<ProductDto> Get([FromQuery] PaginationDto dto)
        {
            return iproductsService.Get(dto);
        }
        [HttpPost]
        public ProductDto Post([FromQuery] PostProductDto dto)
        {
            return iproductsService.Post(dto);
        }
        [HttpDelete]
        public bool Delete(int productId)
        {
            return iproductsService.Delete(productId);
        }
        [HttpPut("{productId}")]
        public ProductDto Put(int productId, PostProductDto dto)
        {
            return iproductsService.Put(productId, dto);
        }
        [HttpGet("{id}")]
        public ProductDto GetById(int id)
        {
            return iproductsService.getById(id);
        }
    }
}
