using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExperiencesController(IExperienceRepository repo) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await repo.GetAllAsync());

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var experience = await repo.GetByIdAsync(id);
        if (experience is null) throw new KeyNotFoundException($"Experience {id} not found.");
        return Ok(experience);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(Experience experience)
    {
        var created = await repo.CreateAsync(experience);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, Experience experience)
    {
        if (id != experience.Id) throw new ArgumentException("ID mismatch.");
        return Ok(await repo.UpdateAsync(experience));
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var experience = await repo.GetByIdAsync(id);
        if (experience is null) throw new KeyNotFoundException($"Experience {id} not found.");
        await repo.DeleteAsync(experience);
        return NoContent();
    }
}