using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Core.Specifications;

namespace Galizar.LeNotes.Core.Services.EF
{
  public class GroupService : IGroupService
  {
    IAsyncRepository<Group> _repository;

    public GroupService(IAsyncRepository<Group> repository) 
    {
      _repository = repository;
    }

    public async Task<Group> CreateGroupAsync(string name, string username) 
    {
      var group = new Group(name, username);

      await _repository.CreateAsync(group);

      return group;
    }

    public async Task<IEnumerable<Group>> GetAllGroupsAsync(string username)
    {
      return await _repository.GetBySpecAsync(new GroupsWithOwnerSpec(username));
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

    public async Task TrashGroupAsync(Group group)
    {
      if (group.IsTrashed) return;
      group.IsTrashed = true;
      await _repository.UpdateAsync(group);
    }

    public async Task TrashGroupsAsync(IEnumerable<long> groupIds)
    {
      var groups = new List<Group>();
      foreach (var id in groupIds)
      {
        var group = await GetGroupByIdAsync(id);
        if (group == null || group.IsTrashed) continue;
        group.IsTrashed = true;
        groups.Add(group);
      }

      await _repository.BatchUpdateAsync(groups);
    }

    public async Task RestoreGroupAsync(Group group)
    {
      if (!group.IsTrashed) return;
      group.IsTrashed = false;
      await _repository.UpdateAsync(group);
    }

    public async Task DeleteGroupAsync(Group group)
    {
      await _repository.DeleteAsync(group);
    }

    public async Task DeleteGroupsAsync(IEnumerable<long> groupIds)
    {
      var groups = new List<Group>();
      foreach (var id in groupIds)
      {
        var group = await GetGroupByIdAsync(id);
        if (group == null) continue;
        groups.Add(group);
      }

      await _repository.BatchDeleteAsync(groups);
    }
  }
}