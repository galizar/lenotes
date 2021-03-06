using System;
using System.Text.Json;

namespace Galizar.LeNotes.Core.Entities 
{
  public class Note : BaseEntity 
  {
    public string Name { get; set; }
    public long GroupId { get; set; }
    public string Content { get; set; }
    public string OwnerUsername { get; set; }

    public Note(string name, long groupId, string owner)
    {
      Name = name;
      GroupId = groupId;
      Content = "";
      OwnerUsername = owner;
      IsTrashed = false;
    }

    public Note DeepCopy()
    {
      // Remember to modify on addition of object properties 
      Note other = (Note) this.MemberwiseClone();
      return other;
    }

    public override bool Equals(object other)
    {
      if ((other == null) || !GetType().Equals(other.GetType()))
      {
        return false;
      }

      if (object.ReferenceEquals(this, other)) return true;

      var otherNote = (Note) other;
      return ToString().Equals(otherNote.ToString());
    }

    public override string ToString()
    {
      return JsonSerializer.Serialize(this);
    }
  }
}