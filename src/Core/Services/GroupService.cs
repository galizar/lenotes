using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Core.Services
{
  public class GroupService : IGroupService
  {
    IAsyncRepository<Group> _repository;

    public GroupService(IAsyncRepository<Group> repository) 
    {
      _repository = repository;
    }

    public async Task<Group> CreateGroupAsync(string name) 
    {
      var group = new Group(name);

      await _repository.CreateAsync(group);

      return group;
    }

    public async Task<IEnumerable<Group>> GetAllGroups()
    {
      return await _repository.GetAll();
    }

    public async Task<Group> GetGroupByIdAsync(long id)
    {
      return await _repository.GetByIdAsync(id);
    }

    public async Task RenameGroupAsync(Group group, string newName)
    {
      group.Name = newName;

      await _repository.UpdateAsync(group);
    }

    public async Task TrashGroup(Group group)
    {
      if (group.IsTrashed) return;
      group.IsTrashed = true;
      await _repository.UpdateAsync(group);
    }

    public async Task RestoreGroup(Group group)
    {
      if (!group.IsTrashed) return;
      group.IsTrashed = false;
      await _repository.UpdateAsync(group);
    }

    public async Task DeleteGroupAsync(Group group)
    {
      await _repository.DeleteAsync(group);
    }
  }
}