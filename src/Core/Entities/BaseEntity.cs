namespace Galizar.LeNotes.Core.Entities {
  public abstract class BaseEntity {
    public long Id { get; set; }
    public bool IsTrashed { get; set; }
  }
}