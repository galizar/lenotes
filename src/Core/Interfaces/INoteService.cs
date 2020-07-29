using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces {
  public interface INoteService {

    Task<Note> CreateNoteAsync(string name, long groupId);
    Task<IEnumerable<Note>> GetAllNotes();
    Task<Note> GetNoteByIdAsync(long id);
    Task SetContentAsync(Note note, string content);
    Task RenameNoteAsync(Note note, string newName);
    Task MoveToGroupAsync(Note note, long groupId);
    Task TrashNote(Note note);
    Task RestoreNote(Note note);
    Task DeleteNoteAsync(Note note);
  }
}