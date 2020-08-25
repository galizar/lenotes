using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Core.Services.Local
{
  public class SelectionService<T> : ISelectionService<T>
  {
    Dictionary<string, Selection<T>> _selections;

    public SelectionService()
    {
      _selections = new Dictionary<string, Selection<T>>();
    }

    public Selection<T> CreateSelection(IEnumerable<long> itemIds)
    {
      var selection = new Selection<T>(Guid.NewGuid().ToString(), itemIds);
      _selections.Add(selection.Id, selection);
      return selection;
    }

    public Selection<T> GetSelection(string id)
    {
      return _selections[id];
    }

    public Selection<T> DeleteSelection(string id)
    {
      var selection = _selections[id];
      _selections.Remove(id);
      return selection;
    }
  }
}