using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Entities;
using Portfolio.Core.Interfaces;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ContactMessageRepository(PortfolioDbContext context)
    : Repository<ContactMessage>(context), IContactMessageRepository
{
    public async Task<IEnumerable<ContactMessage>> GetUnreadAsync() =>
        await _dbSet.AsNoTracking()
            .Where(m => !m.IsRead)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

    public async Task MarkAsReadAsync(Guid id)
    {
        await _dbSet
            .Where(m => m.Id == id)
            .ExecuteUpdateAsync(s => s.SetProperty(m => m.IsRead, true));
    }
}