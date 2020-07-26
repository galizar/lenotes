namespace Galizar.LeNotes.Tests.IntegrationTests.Services
{
  public interface NoteProperty {}

  public class Name : NoteProperty
  {
    public string value { get; }
    public Name(string name) { this.value = name; }
  }

  public class GroupId : NoteProperty
  {
    public long value { get; }
    public GroupId(long id) { this.value = id; }
  }

  public class Content : NoteProperty
  {
    public string value { get; }
    public Content(string content) { this.value = content; }
  }
}