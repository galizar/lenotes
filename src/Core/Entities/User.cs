namespace Galizar.LeNotes.Core.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }

        public User(string username, string email, string password)
        {
            Username = username;
            Email = email;
            HashedPassword = password;
        }
    }
}