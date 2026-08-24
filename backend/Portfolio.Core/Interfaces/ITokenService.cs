using Portfolio.Core.Entities;

namespace Portfolio.Core.Interfaces;

public interface ITokenService
{
    string GenerateToken(AdminUser user);
}