using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Xunit;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Infrastructure.Data;
using Galizar.LeNotes.Core.Services;

namespace Galizar.LeNotes.Tests.IntegrationTests.Services
{
  public class NoteServiceTests
  {

    private readonly Note _testNote = new Note("test note", 1);
    private readonly LeNotesContext _leNotesContext;
    private readonly EfRepository<Note> _notesRepo;
    private readonly NoteService _noteService;

    public NoteServiceTests()
    {
      var dbOptions = new DbContextOptionsBuilder<LeNotesContext>()
        .UseInMemoryDatabase(databaseName: "test db")
        .Options;

      _leNotesContext = new LeNotesContext(dbOptions);
      _notesRepo = new EfRepository<Note>(_leNotesContext);
      _noteService = new NoteService(_notesRepo);
    }

    [Fact]
    public async Task CreatesNote()
    {
      var note = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);

      var receivedNote = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == note.Id);

      Assert.Equal(_testNote.Name, receivedNote.Name);
      Assert.Equal(_testNote.GroupId, receivedNote.GroupId);
      Assert.Equal(_testNote.Content, receivedNote.Content);
    }

    [Fact]
    public async Task GetsExistingNote() 
    {
      var note = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      var receivedNote = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == note.Id);

      Assert.Equal(note.ToString(), receivedNote.ToString());
    }

    [Fact]
    public async Task RenamesNote()
    {
      await TestNotePropertyModification(new Name("daisy bell"));
    }

    [Fact]
    public async Task MovesNoteToGroup()
    {
      await TestNotePropertyModification(new GroupId(2));
    }

    [Fact]
    public async Task SetsNoteContent()
    {
      await TestNotePropertyModification(new Content("these are the new contents"));
    }

    private async Task TestNotePropertyModification(NoteProperty property)
    {
      var note = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      var expectedNote = note.DeepCopy();

      switch(property) {
        case Name n:
          string name = n.value;
          expectedNote.Name = name;
          await _noteService.RenameNoteAsync(note, name);
          break;

        case GroupId gid:
          long id = gid.value;
          expectedNote.GroupId = id;
          await _noteService.MoveToGroupAsync(note, id);
          break;

        case Content c:
          string content = c.value;
          expectedNote.Content = content;
          await _noteService.SetContentAsync(note, content);
          break;

        default:
          Console.WriteLine("This should never print!");
          break;
      }

      var receivedNote = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == note.Id);

      Assert.Equal(expectedNote.ToString(), receivedNote.ToString());
    }

    [Fact]
    public async Task DeletesNote()
    {
      var note = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);

      await _noteService.DeleteNoteAsync(note);

      var receivedNote = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == note.Id);

      Assert.Null(receivedNote);
      Assert.Equal("Detached", _leNotesContext.Entry(note).State.ToString());
    }
  }
}