using System.Collections.Generic;
using System.Threading.Tasks;

using Galizar.LeNotes.Core.Services.Local;

namespace Galizar.LeNotes.Core.Interfaces
{
  public interface ISelectionService<T>
  {
    Selection<T> CreateSelection(IEnumerable<long> itemIds);
    Selection<T> GetSelection(string id);
    Selection<T> DeleteSelection(string id);
  }
}