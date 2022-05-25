using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{

    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50), Required]
        public string Login { get; set; }
        [MaxLength(100), MinLength(10), Required]
        public string Password { get; set; }
        [MaxLength(40), Required]
        public string Name { get; set; }
        [MaxLength(60), Required]
        public string Surname { get; set; }
        public RoleEnum Role { get; set; }
        public List<BasketItem> basketItems { get; set; }

    }
}
