namespace Galizar.LeNotes.Core.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] HashedPassword { get; set; }

        public User(string username, string email, byte[] hash)
        {
            Username = username;
            Email = email;
            HashedPassword = hash;
        }
    }
}