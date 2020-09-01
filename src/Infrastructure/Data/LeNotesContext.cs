using Microsoft.EntityFrameworkCore;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Infrastructure.Data
{
    public class LeNotesContext : DbContext
    {
        public LeNotesContext(DbContextOptions<LeNotesContext> options) : base(options)
        {
        }
        
        public DbSet<Group> Groups { get; set; }
        public DbSet<Note> Notes { get; set; }
    }
}