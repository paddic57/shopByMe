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
        [Authorize]
        public PaginatedData<ProductDto> Get([FromQuery] PaginationDto dto)
        {
            return iproductsService.Get(dto);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ProductDto Post(PostProductDto dto)
        {
            return iproductsService.Post(dto);
        }
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public bool Delete(int productId)
        {
            return iproductsService.Delete(productId);
        }
        [HttpPut("{productId}")]
        [Authorize(Roles = "Admin")]
        public ProductDto Put(int productId, PostProductDto dto)
        {
            return iproductsService.Put(productId, dto);
        }
        [HttpGet("{id}")]
        [Authorize]
        public ProductDto GetById(int id)
        {
            return iproductsService.getById(id);
        }
    }
}