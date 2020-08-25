using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Specifications;

namespace Galizar.LeNotes.Core.Services.EF
{
  public class NoteService : Interfaces.INoteService 
  {

    private LeNotesContext _context;

    public NoteService(LeNotesContext context) 
    {
      _context = context;
    }

    public async Task<Note> CreateNoteAsync(string name, long groupId) 
    {
      var note = new Note(name, groupId);
      await _context.Notes.AddAsync(note);
      await _context.SaveChangesAsync();
      return note;
    }

    public async Task<IEnumerable<Note>> GetAllNotesAsync()
    {
      return await _context.Notes.ToListAsync();
    }

    public async Task<Note> GetNoteByIdAsync(long id) 
    {
      return await _context.Notes.FindAsync(id);
    }

    public async Task<IReadOnlyList<Note>> GetNotesBySpecAsync(ISpecification<Note> spec)
    {
      return await ApplySpecification(spec).ToListAsync();
    }

    public async Task RenameNoteAsync(Note note, string newName) 
    {
      note.Name = newName;
      await _context.SaveChangesAsync();
    }

    public async Task MoveToGroupAsync(Note note, long groupId) 
    {
      note.GroupId = groupId;
      await _context.SaveChangesAsync();
    }

    public async Task SetContentAsync(Note note, string content) 
    {
      note.Content = content;
      await _context.SaveChangesAsync();
    }

    public async Task TrashNoteAsync(Note note)
    {
      if (note.IsTrashed) return;
      note.IsTrashed = true;
      await _context.SaveChangesAsync();
    }

    public async Task TrashNotesAsync(IEnumerable<long> noteIds)
    {
      var notes = new List<Note>();
      foreach (var id in noteIds)
      {
        var note = await GetNoteByIdAsync(id);
        if (note == null || note.IsTrashed) continue;
        note.IsTrashed = true;
        notes.Add(note);
      }
      await _context.SaveChangesAsync();
    }

    public async Task TrashNotesInGroupAsync(long groupId)
    {
      var spec = new NotesWithGroupIdSpec(groupId);
      var notesInGroup = await GetNotesBySpecAsync(spec);

      foreach (Note note in notesInGroup)
      {
        note.IsTrashed = true;
      }

      await _context.SaveChangesAsync();
    }

    public async Task RestoreNoteAsync(Note note)
    {
      if (!note.IsTrashed) return;
      note.IsTrashed = false;
      await _context.SaveChangesAsync();
    }

    public async Task RestoreNotesInGroupAsync(long groupId)
    {
      var spec = new NotesWithGroupIdSpec(groupId);
      var notesInGroup = await GetNotesBySpecAsync(spec);

      foreach (Note note in notesInGroup)
      {
        note.IsTrashed = false;
      }
      
      await _context.SaveChangesAsync();
    }

    public async Task DeleteNoteAsync(Note note) 
    {
      _context.Notes.Remove(note);
      await _context.SaveChangesAsync();
    }

    public async Task DeleteNotesAsync(IEnumerable<long> noteIds)
    {
      foreach (var id in noteIds)
      {
        var note = await GetNoteByIdAsync(id);
        if (note == null) continue;
        _context.Notes.Remove(note);
      }
      await _context.SaveChangesAsync();
    }

    public async Task DeleteNotesInGroupAsync(long groupId)
    {
      var spec = new NotesWithGroupIdSpec(groupId);
      var notesInGroup = await GetNotesBySpecAsync(spec);

      foreach (Note note in notesInGroup)
      {
        _context.Notes.Remove(note);
      }
      await _context.SaveChangesAsync();
    }

    private IQueryable<Note> ApplySpecification(ISpecification<Note> spec)
    {
      var evaluator = new SpecificationEvaluator<Note>();
      return evaluator.GetQuery(_context.Notes.AsQueryable(), spec);
    }
  }
}