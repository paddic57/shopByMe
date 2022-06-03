using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace lab3v2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        public IAuthorizationService iAuthorizationService;
        public IUsersService iUsersService;
        public AuthorizationController(IAuthorizationService iAuthorizationService,
            IUsersService usersService)
        {
            this.iAuthorizationService = iAuthorizationService;
            this.iUsersService = usersService;
        }
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] AuthorizationDto user)
        {
            int role;
            if (iAuthorizationService.Login(user, out role))
            {
                var myClaims = new List<Claim>();
                myClaims.Add(new Claim(ClaimTypes.Name, user.Login));
                myClaims.Add(new Claim("userId", iUsersService.getUserIdByUserLogin(user.Login).ToString()));
                myClaims.Add(new Claim(ClaimTypes.Role, Enum.GetName(typeof(RoleEnum), role)));


                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("patryk1234!@#$patryksuperkey"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:4200",
                    audience: "http://localhost:4200",
                    claims: myClaims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                    );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString});
            }
            else
                return Unauthorized();
         
        }
    }
}
