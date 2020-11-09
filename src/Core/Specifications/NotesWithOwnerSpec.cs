using Ardalis.Specification;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Specifications
{
    public class NotesWithOwnerSpec : Specification<Note>
    {
        public NotesWithOwnerSpec(string username)
        {
            Query.Where(note => note.OwnerUsername == username);
        }
    }
}