using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillsController(ISkillRepository repo) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await repo.GetAllAsync());

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category) =>
        Ok(await repo.GetByCategoryAsync(category));

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var skill = await repo.GetByIdAsync(id);
        if (skill is null) throw new KeyNotFoundException($"Skill {id} not found.");
        return Ok(skill);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(Skill skill)
    {
        var created = await repo.CreateAsync(skill);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, Skill skill)
    {
        if (id != skill.Id) throw new ArgumentException("ID mismatch.");
        return Ok(await repo.UpdateAsync(skill));
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var skill = await repo.GetByIdAsync(id);
        if (skill is null) throw new KeyNotFoundException($"Skill {id} not found.");
        await repo.DeleteAsync(skill);
        return NoContent();
    }
}