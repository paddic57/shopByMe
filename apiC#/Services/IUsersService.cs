using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IUsersService
    {
        public PaginatedData<UsersDto> Get(PaginationDto dto);

        public UsersDto Post(PostUsersDto dto);

        public UsersDto getById(int id);

        public UsersDto Put(int productId, PostUsersDto dto);

        public bool Delete(int id);
    }
}
