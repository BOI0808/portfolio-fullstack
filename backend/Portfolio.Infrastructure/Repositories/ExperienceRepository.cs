using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ExperienceRepository(PortfolioDbContext context)
    : Repository<Experience>(context), IExperienceRepository
{
}