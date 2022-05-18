using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public class RepositoryProductsService : IProductsService
    {
        private readonly Database context;
        public RepositoryProductsService(Database context)
        { 
            this.context = context; 
        }
        public bool Delete(int productId)
        {
            try
            {
                var toDelete = context.Products.Where(x => x.Id == productId).Single();
                context.Products.Remove(toDelete);
                context.SaveChanges();
                return true;
            }
            catch (System.InvalidOperationException e)
            {
                return false;
            }
            
            
        }

        public PaginatedData<ProductDto> Get(PaginationDto dto)
        {
            var toGetProducts = context.Products.ToList();
            if (dto.SortColumn == "Name")
            {
                if(dto.SortAscending)
                    toGetProducts = toGetProducts.OrderBy(a => a.Name).ToList();
                else
                    toGetProducts = toGetProducts.OrderByDescending(a => a.Name).ToList();
            }
            if(dto.SortColumn == "Description")
            {
                if (dto.SortAscending)
                    toGetProducts = toGetProducts.OrderBy(a => a.Description).ToList();
                else
                    toGetProducts = toGetProducts.OrderByDescending(a => a.Description).ToList();

            }
            if(dto.SortColumn == "Price")
            {
                if (dto.SortAscending)
                    toGetProducts = toGetProducts.OrderBy(a => a.Price).ToList();
                else
                    toGetProducts = toGetProducts.OrderByDescending(a => a.Price).ToList();
            }
            PaginatedData<ProductDto> toReturn = new PaginatedData<ProductDto>();
            toReturn.Count = context.Products.Count();
            toReturn.Data = toGetProducts.Select(a => new ProductDto
            {
                Id = a.Id,
                Name = a.Name,
                Description = a.Description,
                Price = a.Price,
            });
            toReturn.Data = toReturn.Data.Skip((dto.Page - 1) * dto.rowsPerPage).Take(dto.rowsPerPage);
            return toReturn;
        }

        public ProductDto Post(PostProductDto dto)
        {
            Product toPost = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
            };
            context.Products.Add(toPost);
            context.SaveChanges();
            var sorted = context.Products.OrderBy(x => x.Id);
            ProductDto added = new ProductDto
            {
                Id = sorted.Last().Id,
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
            };
            return added;
        }

        public ProductDto Put(int productId, PostProductDto dto)
        {
            var product = context.Products.Where(x => x.Id == productId).FirstOrDefault();
            product.Price = dto.Price;
            product.Name = dto.Name;
            product.Description = dto.Description;

            context.SaveChanges();

            var getProduct = new ProductDto
            {
                Name = product.Name,
                Id = product.Id,
                Description = product.Description,
                Price = product.Price,
            };
            return getProduct;
        }
        public ProductDto getById(int id)
        {
            var product = context.Products.SingleOrDefault(x => x.Id == id);
            if (product == null)
                return null;
            var getProduct =  new ProductDto
            {
                Name = product.Name,
                Id = product.Id,
                Description = product.Description,
                Price = product.Price,
            };
            return getProduct;
        }

    }
}
