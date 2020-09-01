using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Xunit;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Services.EF;
using Galizar.LeNotes.Infrastructure.Data;

namespace Galizar.LeNotes.Tests.IntegrationTests.EF.Services
{
  public class GroupServiceTests
  {
    private readonly Group _testGroup = new Group("test group");
    private readonly LeNotesContext _leNotesContext;
    private readonly GroupService _groupService;
    private readonly EFRepository<Group> _repository;

    public GroupServiceTests()
    {
      var dbOptions = TestDbOptionsBuilder.GetDbOptionsBuilder().Options;
      _leNotesContext = new LeNotesContext(dbOptions);
      _repository = new EFRepository<Group>(_leNotesContext);
      _groupService = new GroupService(_repository);
    }

    [Fact]
    public async Task CreatesGroup()
    {
      var group = await _groupService.CreateGroupAsync(_testGroup.Name);

      var receivedGroup = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group.Id);

      Assert.Equal(_testGroup.Name, receivedGroup.Name);
    }

    [Fact]
    public async Task GetsInContextGroup()
    {
      var group = await _groupService.CreateGroupAsync(_testGroup.Name);
      var receivedGroup = await _groupService.GetGroupByIdAsync(group.Id);

      Assert.Equal(group.ToString(), receivedGroup.ToString());
    }

    [Fact]
    public async Task GetsNotInContextGroup()
    {
      var group = await _groupService.CreateGroupAsync(_testGroup.Name);
      
      // Detach group from context to trigger a database request
      _leNotesContext.Entry(group).State = EntityState.Detached;

      var receivedGroup = await _groupService.GetGroupByIdAsync(group.Id);

      Assert.Equal(group.ToString(), receivedGroup.ToString());
    }

    [Fact]
    public async Task RenamesGroup()
    {
      var group = await _groupService.CreateGroupAsync(_testGroup.Name);
      await _groupService.RenameGroupAsync(group, "new test group");

      Assert.Equal("new test group", group.Name);
    }

    [Fact]
    public async Task TrashesGroup()
    {
      var group = await _groupService.CreateGroupAsync(_testGroup.Name);
      await _groupService.TrashGroupAsync(group);

      var receivedGroup = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group.Id);

      Assert.True(receivedGroup.IsTrashed);
    }

    [Fact]
    public async Task TrashesGroups()
    {
      var group1 = await _groupService.CreateGroupAsync(_testGroup.Name);
      var group2 = await _groupService.CreateGroupAsync("foo");
      var group3 = await _groupService.CreateGroupAsync("bar");

      var ids = new long[] {group1.Id, group3.Id};
      await _groupService.TrashGroupsAsync(ids);

      var receivedGroup1 = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group1.Id);
      var receivedGroup2 = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group2.Id);
      var receivedGroup3 = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group3.Id);

      Assert.True(receivedGroup1.IsTrashed);
      Assert.False(receivedGroup2.IsTrashed);
      Assert.True(receivedGroup3.IsTrashed);
    }

    [Fact]
    public async Task DeletesGroup()
    {
      var group = await _groupService.CreateGroupAsync(_testGroup.Name);
      await _groupService.DeleteGroupAsync(group);

      var receivedGroup = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group.Id);

      Assert.Null(receivedGroup);
      Assert.Equal("Detached", _leNotesContext.Entry(group).State.ToString());
    }

    [Fact]
    public async Task DeletesGroups()
    {
      var group1 = await _groupService.CreateGroupAsync(_testGroup.Name);
      var group2 = await _groupService.CreateGroupAsync("foo");
      var group3 = await _groupService.CreateGroupAsync("bar");

      var ids = new long[] {group2.Id, group3.Id};
      await _groupService.DeleteGroupsAsync(ids);

      var receivedGroup1 = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group1.Id);
      var receivedGroup2 = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group2.Id);
      var receivedGroup3 = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group3.Id);

      Assert.NotNull(receivedGroup1);
      Assert.Null(receivedGroup2);
      Assert.Null(receivedGroup3);
    }
  }
}
