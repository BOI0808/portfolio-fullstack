using Portfolio.Core.Entities;

namespace Portfolio.Core.Interfaces;

public interface IContactMessageRepository : IRepository<ContactMessage>
{
    Task<IEnumerable<ContactMessage>> GetUnreadAsync();
    Task MarkAsReadAsync(Guid id);
}