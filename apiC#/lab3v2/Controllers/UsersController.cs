using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lab3v2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersService iUsersService;
        public UsersController(IUsersService iUsersService) {
            this.iUsersService = iUsersService;
        }
        [HttpGet]
        public PaginatedData<UsersDto> Get([FromQuery]PaginationDto dto)
        {
            return iUsersService.Get(dto);
        }
        [HttpPost]
        public UsersDto Post([FromQuery]PostUsersDto dto)
        {
            return iUsersService.Post(dto);
        }
        [HttpGet("{id}")]
        public UsersDto GetById(int id)
        {
            return iUsersService.getById(id);
        }
        [HttpPut("{id}")]
        public UsersDto Put(int id, PostUsersDto dto)
        {
            return iUsersService.Put(id, dto);
        }
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return iUsersService.Delete(id);
        }



    }
}
