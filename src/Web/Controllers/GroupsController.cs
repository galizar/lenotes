using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Core.Services.Local;
using Galizar.LeNotes.Web.Controllers.DTOs;

namespace Galizar.LeNotes.Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class GroupsController : ControllerBase
  {
    private readonly IGroupService _service;
    private readonly ISelectionService<Group> _selectionService;

    public GroupsController(IGroupService service, ISelectionService<Group> selectionService)
    {
      _service = service;
      _selectionService = selectionService;
    }

    [HttpGet()]
    public async Task<IEnumerable<Group>> AllGroups()
    {
      var username = User.FindFirstValue("NameIdentifier");
      return await _service.GetAllGroupsAsync(username);
    }

    [HttpPost("{name}")]
    public async Task<ActionResult<Group>> CreateGroup(string name)
    {
      var username = User.FindFirstValue("NameIdentifier");
      var group = await _service.CreateGroupAsync(name, username);

      return CreatedAtAction(nameof(CreateGroup), new {id = group.Id}, group);
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
    public async Task<IActionResult> TrashGroup(long id)
    {
      var group = await GetGroup(id);
      await _service.TrashGroupAsync(group.Value);
      return NoContent();
    }

    [HttpPut("trashWithIds")]
    public async Task<IActionResult> TrashGroups([FromBody] IdsDTO dto)
    {
      await _service.TrashGroupsAsync(dto.Ids);
      return NoContent();
    }

    [HttpPut("restore/{id}")]
    public async Task<IActionResult> RestoreGroup(long id)
    {
      var group = await GetGroup(id);
      await _service.RestoreGroupAsync(group.Value);
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGroup(long id)
    {
      var group = await GetGroup(id);
      await _service.DeleteGroupAsync(group.Value);

      return NoContent();
    }

    [HttpPost("selections")]
    public ActionResult<SelectionDTO> MakeSelection([FromBody] IdsDTO dto)
    {
      var selection = _selectionService.CreateSelection(dto.Ids);
      var selectionDTO = new SelectionDTO(selection.Id);
      return CreatedAtAction(nameof(GetSelection), new {id = selection.Id}, selectionDTO);
    }

    [HttpGet("selections/{id}")]
    public ActionResult<Selection<Group>> GetSelection(string id)
    {
      return _selectionService.GetSelection(id);
    }

    [HttpDelete("selections/{id}")]
    public IActionResult DeleteSelection(string id)
    {
      _selectionService.DeleteSelection(id);
      return NoContent();
    }
  
    [HttpDelete("deleteGroupsInSelection/{selectionId}", Name = "DeleteGroupsInSelection")]
    public async Task<IActionResult> DeleteGroupsInSelection(string selectionId)
    {
      var selection = _selectionService.DeleteSelection(selectionId);
      await _service.DeleteGroupsAsync(selection.ItemIds);
      return NoContent();
    }
  }
}