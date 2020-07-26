using System;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Xunit;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Services;
using Galizar.LeNotes.Infrastructure.Data;

namespace Galizar.LeNotes.Tests.IntegrationTests.Services
{
  public class GroupServiceTests
  {
    private class LeTest
    {
    }

    private readonly Group _testGroup = new Group("test group");
    private readonly LeNotesContext _leNotesContext;
    private readonly EfRepository<Group> _groupsRepo;
    private readonly GroupService _groupService;

    public GroupServiceTests()
    {
      var dbOptions = new DbContextOptionsBuilder<LeNotesContext>()
        .UseInMemoryDatabase(databaseName: "test db")
        .Options;

      _leNotesContext = new LeNotesContext(dbOptions);
      _groupsRepo = new EfRepository<Group>(_leNotesContext);
      _groupService = new GroupService(_groupsRepo);
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
    public async Task DeletesGroup()
    {
      var group = await _groupService.CreateGroupAsync(_testGroup.Name);
      await _groupService.DeleteGroupAsync(group);

      var receivedGroup = await _leNotesContext.Groups.SingleOrDefaultAsync(g => g.Id == group.Id);

      Assert.Null(receivedGroup);
      Assert.Equal("Detached", _leNotesContext.Entry(group).State.ToString());
    }
  }
}
