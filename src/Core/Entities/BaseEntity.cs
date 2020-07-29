namespace Galizar.LeNotes.Core.Entities {
  public abstract class BaseEntity {
    public virtual long Id { get; protected set; }
    public bool IsTrashed { get; set; }
  }
}