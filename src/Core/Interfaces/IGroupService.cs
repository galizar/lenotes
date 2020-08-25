using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces {
  public interface IGroupService {

    Task<Group> CreateGroupAsync(string name);
    Task<IEnumerable<Group>> GetAllGroupsAsync();
    Task<Group> GetGroupByIdAsync(long id);
    Task RenameGroupAsync(Group group, string newName);
    Task TrashGroupAsync(Group group);
    Task TrashGroupsAsync(IEnumerable<long> groupIds);
    Task RestoreGroupAsync(Group group);
    Task DeleteGroupAsync(Group group);
    Task DeleteGroupsAsync(IEnumerable<long> groupIds);
  }
}