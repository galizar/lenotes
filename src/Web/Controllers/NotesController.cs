using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;
using Galizar.LeNotes.Core.Services.Local;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;
using Web.DTOs;

namespace Galizar.LeNotes.Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public class NotesController : ControllerBase
  {
    private readonly INoteService _service;
    private readonly ISelectionService<Note> _selectionService;
    private readonly string _subject = JwtRegisteredClaimNames.Sub;

    public NotesController(INoteService service, ISelectionService<Note> selectionService)
    {
      _service = service;
      _selectionService = selectionService;
    }

    [HttpPost("{name}/{groupId}")]
    public async Task<ActionResult<Note>> CreateNote(string name, long groupId)
    {
      var username = User.FindFirstValue(_subject);
      var note = await _service.CreateNoteAsync(name, groupId, username);

      return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }

    [HttpGet()]
    public async Task<IEnumerable<Note>> AllNotes()
    {
      var username = User.FindFirstValue(_subject);
      return await _service.GetAllNotesAsync(username);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(long id)
    {
      var note = await _service.GetNoteByIdAsync(id);

      if (note == null) return NotFound();

      return note;
    }

    [HttpPut("rename/{id}/{newName}")]
    public async Task<IActionResult> RenameNote(long id, string newName)
    {
      var note = await GetNote(id);
      await _service.RenameNoteAsync(note.Value, newName);
      return NoContent();
    }

    [HttpPut("setContent")]
    public async Task<IActionResult> SetContent([FromBody] NoteContentDTO dto)
    { 
      var note = await GetNote(dto.Id);
      await _service.SetContentAsync(note.Value, dto.Content);
      return NoContent();
    }

    [HttpPut("move/{id}/{toGroupId}")]
    public async Task<IActionResult> MoveNote(long id, long toGroupId)
    {
      var note = await GetNote(id);
      await _service.MoveToGroupAsync(note.Value, toGroupId);
      return NoContent();
    }

    [HttpPut("trash/{id}")]
    public async Task<IActionResult> TrashNote(long id)
    {
      var note = await GetNote(id);
      await _service.TrashNoteAsync(note.Value);
      return NoContent();
    }

    [HttpPut("trash")]
    public async Task<IActionResult> TrashNotes([FromBody] IdsDTO dto)
    {
      await _service.TrashNotesAsync(dto.Ids);
      return NoContent();
    }

    [HttpPut("trashInGroup/{groupId}")]
    public async Task<IActionResult> TrashNotesInGroup(long groupId)
    {
      await _service.TrashNotesInGroupAsync(groupId);
      return NoContent();
    }

    [HttpPut("restore/{id}")]
    public async Task<IActionResult> RestoreNote(long id)
    {
      var note = await GetNote(id);
      await _service.RestoreNoteAsync(note.Value);
      return NoContent();
    }

    [HttpPut("restoreInGroup/{groupId}")]
    public async Task<IActionResult> RestoreNotesInGroup(long groupId)
    {
      await _service.RestoreNotesInGroupAsync(groupId);
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(long id)
    {
      var note = await GetNote(id);
      await _service.DeleteNoteAsync(note.Value);

      return NoContent();
    }

    [HttpPost("selections")]
    public ActionResult<SelectionDTO> MakeSelection([FromBody] IdsDTO dto)
    {
      var selection = _selectionService.CreateSelection(dto.Ids);
      var selectionDTO = new SelectionDTO(selection.Id);
      return CreatedAtAction(nameof(GetSelection), new { id = selection.Id}, selectionDTO);
    }

    [HttpGet("selections/{id}")]
    public ActionResult<Selection<Note>> GetSelection(string id)
    {
      return _selectionService.GetSelection(id);
    }

    [HttpDelete("selections/{id}")]
    public IActionResult DeleteSelection(string id)
    {
      _selectionService.DeleteSelection(id);
      return NoContent();
    }

    [HttpDelete("deleteNotesInSelection/{selectionId}", Name = "DeleteNotesInSelection")]
    public async Task<IActionResult> DeleteNotesInSelection(string selectionId)
    {
      var selection = _selectionService.DeleteSelection(selectionId);
      await _service.DeleteNotesAsync(selection.ItemIds);
      return NoContent();
    }

    [HttpDelete("deleteInGroup/{groupid}")]
    public async Task<IActionResult> DeleteNotesInGroup(long groupId)
    {
      await _service.DeleteNotesInGroupAsync(groupId);
      return NoContent();
    }
  }
}