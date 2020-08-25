using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Core.Services.EF
{
  public class GroupService : IGroupService
  {
    LeNotesContext _context;

    public GroupService(LeNotesContext context) 
    {
      _context = context;
    }

    public async Task<Group> CreateGroupAsync(string name) 
    {
      var group = new Group(name);

      await _context.Groups.AddAsync(group);
      await _context.SaveChangesAsync();

      return group;
    }

    public async Task<IEnumerable<Group>> GetAllGroupsAsync()
    {
      return await _context.Groups.ToListAsync();
    }

    public async Task<Group> GetGroupByIdAsync(long id)
    {
      return await _context.Groups.FindAsync(id);
    }

    public async Task RenameGroupAsync(Group group, string newName)
    {
      group.Name = newName;
      await _context.SaveChangesAsync();
    }

    public async Task TrashGroupAsync(Group group)
    {
      if (group.IsTrashed) return;
      group.IsTrashed = true;
      await _context.SaveChangesAsync();
    }

    public async Task TrashGroupsAsync(IEnumerable<long> groupIds)
    {
      foreach (var id in groupIds)
      {
        var group = await GetGroupByIdAsync(id);
        if (group == null || group.IsTrashed) continue;
        group.IsTrashed = true;
      }
      await _context.SaveChangesAsync();
    }

    public async Task RestoreGroupAsync(Group group)
    {
      if (!group.IsTrashed) return;
      group.IsTrashed = false;
      await _context.SaveChangesAsync();
    }

    public async Task DeleteGroupAsync(Group group)
    {
      _context.Groups.Remove(group);
      await _context.SaveChangesAsync();
    }

    public async Task DeleteGroupsAsync(IEnumerable<long> groupIds)
    {
      foreach (var id in groupIds)
      {
        var group = await GetGroupByIdAsync(id);
        if (group == null) continue;
        _context.Groups.Remove(group);
      }
      await _context.SaveChangesAsync();
    }
  }
}