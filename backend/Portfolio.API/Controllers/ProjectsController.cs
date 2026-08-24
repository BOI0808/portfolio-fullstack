using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(IProjectRepository repo) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await repo.GetAllAsync());

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured() =>
        Ok(await repo.GetFeaturedAsync());

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var project = await repo.GetByIdAsync(id);
        if (project is null) throw new KeyNotFoundException($"Project {id} not found.");
        return Ok(project);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(Project project)
    {
        var created = await repo.CreateAsync(project);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, Project project)
    {
        if (id != project.Id) throw new ArgumentException("ID mismatch.");
        return Ok(await repo.UpdateAsync(project));
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var project = await repo.GetByIdAsync(id);
        if (project is null) throw new KeyNotFoundException($"Project {id} not found.");
        await repo.DeleteAsync(project);
        return NoContent();
    }
}