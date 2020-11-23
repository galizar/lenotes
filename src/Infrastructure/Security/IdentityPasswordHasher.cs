using Microsoft.AspNetCore.Identity;
using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Infrastructure.Security
{
    public class IdentityPasswordHasher : ILeNotesPasswordHasher
    {
        IPasswordHasher<User> _hasher;
        
        public IdentityPasswordHasher(IPasswordHasher<User> hasher)
        {
            _hasher = hasher;
        }
        
        public string Hash(User user, string password)
        {
            // this method requires an user but it doesn't do anything with it :\
            return _hasher.HashPassword(user, password);
        }
    }
}