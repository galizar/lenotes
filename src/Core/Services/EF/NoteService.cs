using System.Collections.Generic;
using System.Threading.Tasks;

using Ardalis.Specification;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Core.Specifications;

namespace Galizar.LeNotes.Core.Services.EF
{
  public class NoteService : INoteService 
  {
    private IAsyncRepository<Note> _repository;

    public NoteService(IAsyncRepository<Note> repository) 
    {
      _repository = repository;
    }

    public async Task<Note> CreateNoteAsync(string name, long groupId, string username) 
    {
      var note = new Note(name, groupId, username);
      return await _repository.CreateAsync(note);
    }

    public async Task<IEnumerable<Note>> GetAllNotesAsync(string username)
    {
      return await _repository.GetBySpecAsync(new NotesWithOwnerSpec(username));
    }

    public async Task<Note> GetNoteByIdAsync(long id)
    {
      return await _repository.GetByIdAsync(id);
    }

    public async Task RenameNoteAsync(Note note, string newName) 
    {
      note.Name = newName;
      await _repository.UpdateAsync(note);
    }

    public async Task MoveToGroupAsync(Note note, long groupId) 
    {
      note.GroupId = groupId;
      await _repository.UpdateAsync(note);
    }

    public async Task SetContentAsync(Note note, string content) 
    {
      note.Content = content;
      await _repository.UpdateAsync(note);
    }

    public async Task TrashNoteAsync(Note note)
    {
      if (note.IsTrashed) return;
      note.IsTrashed = true;
      await _repository.UpdateAsync(note);
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
      await _repository.BatchUpdateAsync(notes);
    }

    public async Task TrashNotesInGroupAsync(long groupId)
    {
      var spec = new NotesWithGroupIdSpec(groupId);
      var notesInGroup = await _repository.GetBySpecAsync(spec);

      foreach (Note note in notesInGroup)
      {
        note.IsTrashed = true;
      }

      await _repository.BatchUpdateAsync(notesInGroup);
    }

    public async Task RestoreNoteAsync(Note note)
    {
      if (!note.IsTrashed) return;
      note.IsTrashed = false;
      await _repository.UpdateAsync(note);
    }

    public async Task RestoreNotesInGroupAsync(long groupId)
    {
      var spec = new NotesWithGroupIdSpec(groupId);
      var notesInGroup = await _repository.GetBySpecAsync(spec);

      foreach (Note note in notesInGroup)
      {
        note.IsTrashed = false;
      }

      await _repository.BatchUpdateAsync(notesInGroup);
    }

    public async Task DeleteNoteAsync(Note note)
    {
      await _repository.DeleteAsync(note);
    }

    public async Task DeleteNotesAsync(IEnumerable<long> noteIds)
    {
      var notes = new List<Note>();
      foreach (var id in noteIds)
      {
        var note = await GetNoteByIdAsync(id);
        if (note == null) continue;
        notes.Add(note);
      }

      await _repository.BatchDeleteAsync(notes);
    }

    public async Task DeleteNotesInGroupAsync(long groupId)
    {
      var spec = new NotesWithGroupIdSpec(groupId);
      var notesInGroup = await _repository.GetBySpecAsync(spec);

      await _repository.BatchDeleteAsync(notesInGroup);
    }
  }
}