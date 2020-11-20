namespace Galizar.LeNotes.Core.Interfaces
{
    public interface IPasswordHasher
    {
        byte[] Hash(string password);
    }
}