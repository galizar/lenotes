using System.Threading.Tasks;
using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateAsync(string username, string email, string password);
        Task ChangeEmailAsync(User user, string newEmail);
        Task ChangePasswordAsync(User user, string newPassword);
        Task DeleteAsync(User user);
    }
}