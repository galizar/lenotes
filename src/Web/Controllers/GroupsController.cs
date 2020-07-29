using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class GroupsController : ControllerBase
  {
    private readonly IGroupService _service;

    public GroupsController(IGroupService service)
    {
      _service = service;
    }

    [HttpGet()]
    public async Task<IEnumerable<Group>> AllGroups()
    {
      return await _service.GetAllGroups();
    }

    [HttpPost("{name}")]
    public async Task<ActionResult<Group>> CreateGroup(string name)
    {
      var group = await _service.CreateGroupAsync(name);

      return CreatedAtAction(nameof(GetGroup), new {id = group.Id}, group);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Group>> GetGroup(long id)
    {
      var group = await _service.GetGroupByIdAsync(id);

      if (group == null) return NotFound();

      return group;
    }

    [HttpPut("rename/{id}/{newName}")]
    public async Task<IActionResult> RenameGroup(long id, string newName)
    {
      var group = await GetGroup(id);
      await _service.RenameGroupAsync(group.Value, newName);

      return NoContent();
    }

    [HttpPut("trash/{id}")]
    public async Task<IActionResult> TrashNote(long id)
    {
      var group = await GetGroup(id);
      await _service.TrashGroup(group.Value);
      return NoContent();
    }

    [HttpPut("restore/{id}")]
    public async Task<IActionResult> RestoreNote(long id)
    {
      var group = await GetGroup(id);
      await _service.RestoreGroup(group.Value);
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGroup(long id)
    {
      var group = await GetGroup(id);
      await _service.DeleteGroupAsync(group.Value);

      return NoContent();
    }
  }
}