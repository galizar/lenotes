using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces {
  public interface IAsyncRepository<T> where T: BaseEntity {

    Task<IEnumerable<T>> GetAll();
    Task<T> GetByIdAsync(long id);
    Task<T> CreateAsync(T entity);
    Task UpdateAsync(T entity);
    Task<T> DeleteAsync(T entity);
  }
}