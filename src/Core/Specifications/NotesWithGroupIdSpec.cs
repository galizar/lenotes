using Ardalis.Specification;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Specifications
{
  public class NotesWithGroupIdSpec : Specification<Note> 
  {
    public NotesWithGroupIdSpec(long groupId)
    {
      Query.Where(note => note.GroupId == groupId);
    }
  }
}