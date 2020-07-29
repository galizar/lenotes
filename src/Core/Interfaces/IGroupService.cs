using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Interfaces {
  public interface IGroupService {

    Task<Group> CreateGroupAsync(string name);
    Task<IEnumerable<Group>> GetAllGroups();
    Task<Group> GetGroupByIdAsync(long id);
    Task RenameGroupAsync(Group group, string newName);
    Task TrashGroup(Group group);
    Task RestoreGroup(Group group);
    Task DeleteGroupAsync(Group group);
  }
}