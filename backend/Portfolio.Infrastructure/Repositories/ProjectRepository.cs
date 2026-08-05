using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ProjectRepository(PortfolioDbContext context)
    : Repository<Project>(context), IProjectRepository
{
    public async Task<IEnumerable<Project>> GetFeaturedAsync() =>
        await _dbSet.AsNoTracking()
            .Where(p => p.IsFeatured)
            .OrderBy(p => p.SortOrder)
            .ToListAsync();
}