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

        public bool Login(AuthorizationDto user, out int role)
        {
            if (context.Users.Where(x => x.Login == user.Login && x.Password == user.Password).Any())
            {
                role = ((int)context.Users.Where(x => x.Login == user.Login && x.Password == user.Password).FirstOrDefault().Role);
                return true;
            }

            else
            {
                role = -1;
                return false;
            }
                
        }
    }
}
