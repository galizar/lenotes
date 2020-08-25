using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using Xunit;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Core.Services.EF;

namespace Galizar.LeNotes.Tests.IntegrationTests.Services
{
  public class NoteServiceTests
  {

    private readonly Note _testNote = new Note("test note", 1);
    private readonly LeNotesContext _leNotesContext;
    private readonly INoteService _noteService;

    public NoteServiceTests()
    {
      var dbOptions = TestDbOptionsBuilder.GetDbOptionsBuilder().Options;
      _leNotesContext = new LeNotesContext(dbOptions);
      _noteService = new NoteService(_leNotesContext);
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
    public async Task TrashesNote()
    {
      var note = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);

      await _noteService.TrashNoteAsync(note);

      var receivedNote = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == note.Id);

      Assert.True(receivedNote.IsTrashed);
    }

    [Fact]
    public async Task TrashesNotes()
    {
      var noteA = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      var noteB = await _noteService.CreateNoteAsync("foo note", _testNote.GroupId);
      var noteC = await _noteService.CreateNoteAsync("bar note", 3);

      var ids = new long[] {noteA.Id, noteB.Id};
      await _noteService.TrashNotesAsync(ids);

      var receivedNoteA = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteA.Id);
      var receivedNoteB = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteB.Id);
      var receivedNoteC = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteC.Id);

      Assert.True(receivedNoteA.IsTrashed);
      Assert.True(receivedNoteB.IsTrashed);
      Assert.False(receivedNoteC.IsTrashed);
    }

    [Fact]
    public async Task TrashesNotesInGroup()
    {
      await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      await _noteService.CreateNoteAsync("foo note", _testNote.GroupId);
      await _noteService.CreateNoteAsync("bar note", _testNote.GroupId);
      var onlyNoteLeft = await _noteService.CreateNoteAsync("baz note", 2);

      await _noteService.TrashNotesInGroupAsync(_testNote.GroupId);

      var notes = await _noteService.GetAllNotesAsync();

      foreach (Note note in notes)
      {
        if (note.GroupId == _testNote.GroupId)
        {
          Assert.True(note.IsTrashed);
        }
      }
    }

    [Fact]
    public async Task RestoresNote()
    {
      var note = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      
      await _noteService.TrashNoteAsync(note);
      await _noteService.RestoreNoteAsync(note);

      var receivedNote = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == note.Id);

      Assert.False(receivedNote.IsTrashed);
    }

    [Fact]
    public async Task RestoresNotesInGroup()
    {
      var noteA = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      var noteB = await _noteService.CreateNoteAsync("foo note", _testNote.GroupId);
      var noteC = await _noteService.CreateNoteAsync("bar note", 3);

      await _noteService.TrashNoteAsync(noteA);
      await _noteService.TrashNoteAsync(noteB);
      await _noteService.TrashNoteAsync(noteC);
    
      // this test assumes TrashNoteAsync works as expected

      await _noteService.RestoreNotesInGroupAsync(_testNote.GroupId);

      var shouldBeNonRestoredNote = 
        await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteC.Id);

      Assert.True(shouldBeNonRestoredNote.IsTrashed);

      var shouldBeRestoredNotes = new Note[] 
      {
        await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteA.Id),
        await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteB.Id)
      };

      foreach (Note note in shouldBeRestoredNotes)
      {
        Assert.False(note.IsTrashed);
      }
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

    [Fact]
    public async Task DeletesNotes()
    {
      var noteA = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      var noteB = await _noteService.CreateNoteAsync("foo note", _testNote.GroupId);
      var noteC = await _noteService.CreateNoteAsync("bar note", 3);

      var ids = new long[] {noteA.Id, noteC.Id};
      await _noteService.DeleteNotesAsync(ids);

      var receivedNoteA = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteA.Id);
      var receivedNoteB = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteB.Id);
      var receivedNoteC = await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteC.Id);

      Assert.Null(receivedNoteA);
      Assert.NotNull(receivedNoteB);
      Assert.Null(receivedNoteC);
    }

    [Fact]
    public async Task DeletesNotesInGroup()
    {
      var noteA = await _noteService.CreateNoteAsync(_testNote.Name, _testNote.GroupId);
      var noteB = await _noteService.CreateNoteAsync("foo note", _testNote.GroupId);
      var noteC = await _noteService.CreateNoteAsync("bar note", 3);

      await _noteService.DeleteNotesInGroupAsync(_testNote.GroupId);

      var shouldBeNonDeletedNote = 
        await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteC.Id);

      Assert.NotNull(shouldBeNonDeletedNote);

      var shouldBeDeletedNotes = new Note[]
      {
        await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteA.Id),
        await _leNotesContext.Notes.SingleOrDefaultAsync(n => n.Id == noteB.Id)
      };

      foreach (Note note in shouldBeDeletedNotes)
      {
        Assert.Null(note);
      }
    }
  }
}