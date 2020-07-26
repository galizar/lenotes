using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Xunit;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Infrastructure.Data;

namespace Galizar.LeNotes.Tests.IntegrationTests.Repositories.NoteRepository
{
  public class GetById
  {
    private readonly LeNotesContext _leNotesContext;
    private readonly EfRepository<Note> _notesRepository;

    public GetById()
    {
      var dbOptions = new DbContextOptionsBuilder<LeNotesContext>()
        .UseInMemoryDatabase(databaseName: "test db")
        .Options;
      _leNotesContext = new LeNotesContext(dbOptions);
      _notesRepository = new EfRepository<Note>(_leNotesContext);
    }

    [Fact]
    public async Task GetsExistingNote()
    {
      var note = new Note("test note", 0);
      _leNotesContext.Notes.Add(note);
      _leNotesContext.SaveChanges();
      long noteId = note.Id;

      var orderFromRepo = await _notesRepository.GetByIdAsync(noteId);
      Assert.Equal(note.Id, orderFromRepo.Id);
      Assert.Equal("test note", orderFromRepo.Name);
      Assert.Equal(0, orderFromRepo.GroupId);
    }
  }
}