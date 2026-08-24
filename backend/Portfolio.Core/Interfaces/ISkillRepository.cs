using Portfolio.Core.Entities;

namespace Portfolio.Core.Interfaces;

public interface ISkillRepository : IRepository<Skill>
{
    Task<IEnumerable<Skill>> GetByCategoryAsync(string category);
}