using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{

    [Table("BasketItems")]
    public class BasketItem
    {
        [Key]
        public int Id { get; set; }
        public int Count { get; set; }
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User user { get; set; }

        public int ProductId { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product product { get; set; }


    }
}
