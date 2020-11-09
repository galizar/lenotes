using Ardalis.Specification;

using Galizar.LeNotes.Core.Entities;

namespace Galizar.LeNotes.Core.Specifications
{
  public class GroupsWithOwnerSpec : Specification<Group>
  {
    public GroupsWithOwnerSpec(string username)
    {
      Query.Where(group => group.OwnerUsername == username);
    }
  }
}