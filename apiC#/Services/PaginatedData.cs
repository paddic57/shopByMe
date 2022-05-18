using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PaginatedData<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int Count { get; set; }
    }
}
