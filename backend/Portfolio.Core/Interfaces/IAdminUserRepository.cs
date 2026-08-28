using Portfolio.Core.Entities;

namespace Portfolio.Core.Interfaces;

public interface IAdminUserRepository : IRepository<AdminUser>
{
    Task<AdminUser?> GetByUsernameAsync(string username);
}