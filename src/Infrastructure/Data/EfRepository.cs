using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Infrastructure.Data {
  public class EfRepository<T> : IAsyncRepository<T> where T : BaseEntity
  {

    protected readonly LeNotesContext _dbContext;
    public EfRepository(LeNotesContext dbContext)
    {
      _dbContext = dbContext;
    }

    public async Task<T> CreateAsync(T entity)
    {
      await _dbContext.Set<T>().AddAsync(entity);
      await _dbContext.SaveChangesAsync();

      return entity;
    }

    public async Task<IEnumerable<T>> GetAll()
    {
      return await _dbContext.Set<T>().ToListAsync();
    }
    public async Task<T> GetByIdAsync(long id)
    {
      return await _dbContext.Set<T>().FindAsync(id);
    }

    public async Task UpdateAsync(T entity)
    {
      await _dbContext.SaveChangesAsync();
    }

    public async Task<T> DeleteAsync(T entity)
    {
      _dbContext.Set<T>().Remove(entity);
      await _dbContext.SaveChangesAsync();
      return entity;
    }
  }
}