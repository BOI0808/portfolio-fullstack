using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactMessagesController(IContactMessageRepository repo) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Send(ContactMessage message)
    {
        var created = await repo.CreateAsync(message);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await repo.GetAllAsync());

    [Authorize]
    [HttpGet("unread")]
    public async Task<IActionResult> GetUnread() =>
        Ok(await repo.GetUnreadAsync());

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var message = await repo.GetByIdAsync(id);
        if (message is null) throw new KeyNotFoundException($"Message {id} not found.");
        return Ok(message);
    }

    [Authorize]
    [HttpPatch("{id:guid}/read")]
    public async Task<IActionResult> MarkAsRead(Guid id)
    {
        await repo.MarkAsReadAsync(id);
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var message = await repo.GetByIdAsync(id);
        if (message is null) throw new KeyNotFoundException($"Message {id} not found.");
        await repo.DeleteAsync(message);
        return NoContent();
    }
}