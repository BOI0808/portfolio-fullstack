using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class SkillRepository(PortfolioDbContext context)
    : Repository<Skill>(context), ISkillRepository
{
    public async Task<IEnumerable<Skill>> GetByCategoryAsync(string category) =>
        await _dbSet.AsNoTracking()
            .Where(s => s.Category == category)
            .OrderBy(s => s.SortOrder)
            .ToListAsync();
}