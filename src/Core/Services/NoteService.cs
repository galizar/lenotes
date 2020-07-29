using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Core.Services 
{
  public class NoteService : Interfaces.INoteService 
  {

    private IAsyncRepository<Note> _repository;

    public NoteService(IAsyncRepository<Note> repository) 
    {
      _repository = repository;
    }

    public async Task<Note> CreateNoteAsync(string name, long groupId) 
    {
      var note = new Note(name, groupId);
      return await _repository.CreateAsync(note);
    }

    public async Task<IEnumerable<Note>> GetAllNotes()
    {
      return await _repository.GetAll();
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

    public async Task TrashNote(Note note)
    {
      if (note.IsTrashed) return;
      note.IsTrashed = true;
      await _repository.UpdateAsync(note);
    }

    public async Task RestoreNote(Note note)
    {
      if (!note.IsTrashed) return;
      note.IsTrashed = false;
      await _repository.UpdateAsync(note);
    }

    public async Task DeleteNoteAsync(Note note) 
    {
      await _repository.DeleteAsync(note);
    }
  }
}