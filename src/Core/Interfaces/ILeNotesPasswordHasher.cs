using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces
{
    public interface ILeNotesPasswordHasher
    {
        string Hash(User user, string password);
    }
}