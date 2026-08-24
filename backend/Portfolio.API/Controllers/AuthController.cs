using Microsoft.AspNetCore.Mvc;
using Portfolio.Core.DTOs;
using Portfolio.Core.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAdminUserRepository userRepo, ITokenService tokenService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await userRepo.GetByUsernameAsync(request.Username);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid username or password.");

        var token = tokenService.GenerateToken(user);

        return Ok(new LoginResponse
        {
            Token = token,
            ExpiresAt = DateTime.UtcNow.AddHours(24)
        });
    }
}