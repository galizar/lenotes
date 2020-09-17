using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces {
  public interface INoteService {

    Task<Note> CreateNoteAsync(string name, long groupId);
    Task<IEnumerable<Note>> GetAllNotesAsync();
    Task<Note> GetNoteByIdAsync(long id);
    Task SetContentAsync(Note note, string content);
    Task RenameNoteAsync(Note note, string newName);
    Task MoveToGroupAsync(Note note, long groupId);
    Task TrashNoteAsync(Note note);
    Task TrashNotesAsync(IEnumerable<long> noteIds);
    Task TrashNotesInGroupAsync(long groupId);
    Task RestoreNoteAsync(Note note);
    Task RestoreNotesInGroupAsync(long groupId);
    Task DeleteNoteAsync(Note note);
    Task DeleteNotesAsync(IEnumerable<long> noteIds);
    Task DeleteNotesInGroupAsync(long groupId);
  }
}