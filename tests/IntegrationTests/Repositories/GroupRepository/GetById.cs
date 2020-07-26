using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Xunit;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Infrastructure.Data;

namespace Galizar.LeNotes.Tests.IntegrationTests.Repositories.GroupRepository
{
  public class GetById
  {
    private readonly LeNotesContext _leNotesContext;
    private readonly EfRepository<Group> _groupRepository;

    public GetById()
    {
      var dbOptions = new DbContextOptionsBuilder<LeNotesContext>()
        .UseInMemoryDatabase(databaseName: "test db")
        .Options;
      
      _leNotesContext = new LeNotesContext(dbOptions);
      _groupRepository = new EfRepository<Group>(_leNotesContext);
    }

    [Fact]
    public async Task GetsExistingGroup()
    {
      var group = new Group("test group");
      _leNotesContext.Groups.Add(group);
      _leNotesContext.SaveChanges();
      long groupId = group.Id;

      var orderFromRepo = await _groupRepository.GetByIdAsync(groupId);
      Assert.Equal(groupId, orderFromRepo.Id);
    }
  }
}