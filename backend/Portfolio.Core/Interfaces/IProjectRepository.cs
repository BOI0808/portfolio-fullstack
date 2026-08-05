using Portfolio.Core.Entities;

namespace Portfolio.Core.Interfaces;

public interface IProjectRepository : IRepository<Project>
{
    Task<IEnumerable<Project>> GetFeaturedAsync();
}
