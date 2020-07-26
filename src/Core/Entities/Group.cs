using System.Text.Json;

namespace Galizar.LeNotes.Core.Entities 
{
  public class Group : BaseEntity 
  {
    public string Name { get; set; }

    public Group(string name) 
    {
      Name = name;
    }

    public Group DeepCopy()
    {
      // Remember to modify on addition of object properties
      Group other = (Group) this.MemberwiseClone();
      return other;
    }

    public override bool Equals(object other)
    {
      if ((other == null) || !this.GetType().Equals(other.GetType()))
      {
        return false;
      } 

      if (object.ReferenceEquals(this, other)) return true;

      var g = (Group) other;
      return ToString().Equals(other.ToString());
    }

    public override string ToString()
    {
      return JsonSerializer.Serialize(this);
    }
  }
}