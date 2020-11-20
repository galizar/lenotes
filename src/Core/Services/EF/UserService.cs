using System.Threading.Tasks;
using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Core.Services.EF
{
    public class UserService : IUserService
    {
        private IAsyncRepository<User> _repository;
        private IPasswordHasher _hasher;

        public UserService(IAsyncRepository<User> repository, IPasswordHasher hasher)
        {
            _repository = repository;
            _hasher = hasher;
        }
        
        public async Task<User> CreateAsync(string username, string email, string password)
        {
            var user = new User(username, email, _hasher.Hash(password));
            
            return await _repository.CreateAsync(user);
        }

        public async Task ChangeEmailAsync(User user, string newEmail)
        {
            user.Email = newEmail;
            await _repository.UpdateAsync(user);
        }

        public async Task ChangePasswordAsync(User user, string newPassword)
        {
            user.HashedPassword = _hasher.Hash(newPassword);
            await _repository.UpdateAsync(user);
        }

        public async Task DeleteAsync(User user)
        {
            await _repository.DeleteAsync(user);
        }
    }
}