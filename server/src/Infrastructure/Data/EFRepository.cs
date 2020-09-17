using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Infrastructure.Data
{
    public class EFRepository<T> : IAsyncRepository<T> where T: BaseEntity
    {
        private LeNotesContext _context;

        public EFRepository(LeNotesContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync(long id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> GetBySpecAsync(ISpecification<T> spec)
        {
            return ApplySpecification(spec).ToList();
        }

        public async Task<T> CreateAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task BatchUpdateAsync(IReadOnlyList<T> entityBatch)
        {
            var set = _context.Set<T>();
            foreach (T entity in entityBatch)
            {
                set.Update(entity);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<T> DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task BatchDeleteAsync(IReadOnlyList<T> entityBatch)
        {
            var set = _context.Set<T>();
            foreach (T entity in entityBatch)
            {
                set.Remove(entity);
            }
            await _context.SaveChangesAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            var evaluator = new SpecificationEvaluator<T>();
            return evaluator.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}