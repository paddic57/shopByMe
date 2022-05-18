using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace lab3v2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        public IAuthorizationService iAuthorizationService;
        public AuthorizationController(IAuthorizationService iAuthorizationService)
        {
            this.iAuthorizationService = iAuthorizationService;
        }
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] AuthorizationDto user)
        {
            if (user == null)
                return BadRequest("Invalid client");
            var tokenString = iAuthorizationService.Login(user);
            if (tokenString == "unAuthorized")
                return Unauthorized();
            else
                return Ok(new { Token = tokenString});
        }
    }
}
