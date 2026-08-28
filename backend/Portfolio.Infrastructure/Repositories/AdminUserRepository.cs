using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class AdminUserRepository(PortfolioDbContext context)
    : Repository<AdminUser>(context), IAdminUserRepository
{
    public async Task<AdminUser?> GetByUsernameAsync(string username) =>
        await _dbSet.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == username);
}