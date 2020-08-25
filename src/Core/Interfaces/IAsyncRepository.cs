using System.Collections.Generic;
using System.Threading.Tasks;

using Ardalis.Specification;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces {
  public interface IAsyncRepository<T> where T: BaseEntity {

    Task<IEnumerable<T>> GetAllAsync();
    Task<T> GetByIdAsync(long id);
    Task<IReadOnlyList<T>> GetBySpecAsync(ISpecification<T> spec);
    Task<T> CreateAsync(T entity);
    Task UpdateAsync(T entity);
    Task BatchUpdateAsync(IReadOnlyList<T> entityBatch);
    Task<T> DeleteAsync(T entity);
    Task BatchDeleteAsync(IReadOnlyList<T> entityBatch);
  }
}