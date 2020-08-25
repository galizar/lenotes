using System.Collections.Generic;

namespace Galizar.LeNotes.Core.Services.Local
{
  public class Selection<T>
  {
    public string Id { get; set; }
    public IEnumerable<long> ItemIds { get; set; }

    public Selection(string id, IEnumerable<long> itemIds)
    {
      Id = id;
      ItemIds = itemIds;
    }
  }
}