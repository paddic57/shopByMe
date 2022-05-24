using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Models;

namespace Services
{
    public class RepositoryUsersService : IUsersService
    {
        Database context;

        public RepositoryUsersService(Database context)
        {
            this.context = context;
        }


        public PaginatedData<UsersDto> Get(PaginationDto dto)
        {
            int count = context.Users.Count();
            var getListUsers = context.Users.ToList();
            if (dto.SortColumn == "Name")
            {
                if (dto.SortAscending) 
                    getListUsers = getListUsers.OrderBy(a => a.Name).ToList();
                else 
                    getListUsers = getListUsers.OrderByDescending(a => a.Name).ToList(); 
            }
            if (dto.SortColumn == "Login")
            {
                if (dto.SortAscending)
                    getListUsers = getListUsers.OrderBy(a => a.Login).ToList();
                else
                    getListUsers = getListUsers.OrderByDescending(a => a.Login).ToList();
            }
            if (dto.SortColumn == "Surname")
            {
                if (dto.SortAscending)
                    getListUsers = getListUsers.OrderBy(a => a.Surname).ToList();
                else
                    getListUsers = getListUsers.OrderByDescending(a => a.Surname).ToList();
            }
            var listSortedUsersDto = getListUsers.Select(a => new UsersDto
            {
               Id = a.Id,
               Login = a.Login,
               Name = a.Name,
               Surname = a.Surname,
            });
            listSortedUsersDto = listSortedUsersDto.Skip((dto.Page - 1) * dto.rowsPerPage).Take(dto.rowsPerPage);
            PaginatedData<UsersDto> toReturn = new PaginatedData<UsersDto> { Data = listSortedUsersDto, Count = count };
            return toReturn;
        }

        public UsersDto Post(PostUsersDto dto)
        {
            if (!context.Users.Where(x => x.Login == dto.Login).Any())
            {
                User user = new User { 
                    Name = dto.Name,
                    Surname = dto.Surname,
                    Login = dto.Login,
                    Password = dto.Password 
                };
                context.Users.Add(user);
                context.SaveChanges();
                var sorted = context.Users.OrderBy(x => x.Id);
                UsersDto userDto = new UsersDto {
                    Id = sorted.Last().Id,
                    Name = dto.Name,
                    Surname = dto.Surname,
                    Login = dto.Login 
                };
                return userDto;
            }
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            

        }

        public UsersDto Put(int userId, PostUsersDto dto)
        {
            var user = context.Users.Where(x => x.Id == userId).FirstOrDefault();
            user.Surname = dto.Surname;
            user.Name = dto.Name;

            context.SaveChanges();

            var retUser = new UsersDto
            {
                Id = user.Id,
                Login = user.Login,
                Surname = user.Surname,
                Name = user.Name,
             };
            return retUser;
        }
        public UsersDto getById(int id)
        {
            var user = context.Users.Where(x => x.Id == id).FirstOrDefault();
            if (user == null)
                return null;
            var retUser = new UsersDto
            {
                Id = user.Id,
                Login = user.Login,
                Surname = user.Surname,
                Name = user.Name,
            };
            return retUser;
        }
        public bool Delete(int id)
        {
            var user = context.Users.Where(x => x.Id == id).FirstOrDefault();
            if (user == null)
                return false;
            this.context.Users.Remove(user);
            this.context.SaveChanges();
            return true;
        }


    }
}
