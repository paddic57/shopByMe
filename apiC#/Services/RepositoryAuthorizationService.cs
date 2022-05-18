using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using Newtonsoft.Json.Linq;

namespace Services
{
    public class RepositoryAuthorizationService : IAuthorizationService
    {
        public readonly Database context;

        public RepositoryAuthorizationService(Database context)
        {
            this.context = context;
        }

        public string Login(AuthorizationDto user)
        {
            if (context.Users.Where(x => x.Login == user.Login && x.Password == user.Password).Any())
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("patryk1234supersecuritykey"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:4200",
                    audience: "http://localhost:4200",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                    );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return tokenString;
            }
            else
                return "unAuthorized";
        }
    }
}
