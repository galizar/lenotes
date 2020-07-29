using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Galizar.LeNotes.Infrastructure.Data;
using Galizar.LeNotes.Core.Entities;
using Galizar.LeNotes.Core.Interfaces;

namespace Galizar.LeNotes.Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class NotesController : ControllerBase
  {
    private readonly INoteService _service;

    public NotesController(INoteService service)
    {
      _service = service;
    }

    [HttpPost("{name}/{groupId}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<Note>> CreateNote(string name, long groupId)
    {
      var note = await _service.CreateNoteAsync(name, groupId);

      return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }

    [HttpGet()]
    public async Task<IEnumerable<Note>> AllNotes()
    {
      return await _service.GetAllNotes();
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

    [HttpPut("setContent/{id}/{content}")]
    public async Task<IActionResult> SetContent(long id, string content)
    {
      var note = await GetNote(id);
      await _service.SetContentAsync(note.Value, content);
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
      await _service.TrashNote(note.Value);
      return NoContent();
    }

    [HttpPut("restore/{id}")]
    public async Task<IActionResult> RestoreNote(long id)
    {
      var note = await GetNote(id);
      await _service.RestoreNote(note.Value);
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(long id)
    {
      var note = await GetNote(id);
      await _service.DeleteNoteAsync(note.Value);

      return NoContent();
    }
  }
}