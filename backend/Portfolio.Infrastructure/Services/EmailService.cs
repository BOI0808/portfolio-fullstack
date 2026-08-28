using Microsoft.Extensions.Configuration;
using Resend;

namespace Portfolio.Infrastructure.Services;

public interface IEmailService
{
    Task SendContactNotificationAsync(string senderName, string senderEmail, string subject, string message);
}

public class EmailService(IResend resend, IConfiguration config) : IEmailService
{
    public async Task SendContactNotificationAsync(string senderName, string senderEmail, string subject, string message)
    {
        var recipientEmail = config["EmailSettings:RecipientEmail"] 
            ?? throw new InvalidOperationException("EmailSettings:RecipientEmail is not configured.");

        var msg = new EmailMessage
        {
            From = "Portfolio <onboarding@resend.dev>",
            To = [recipientEmail],
            Subject = $"[Portfolio] Tin nhắn mới từ {senderName}",
            HtmlBody = $"""
                <h2>Bạn có tin nhắn mới từ Portfolio</h2>
                <p><strong>Tên:</strong> {senderName}</p>
                <p><strong>Email:</strong> {senderEmail}</p>
                <p><strong>Tiêu đề:</strong> {subject}</p>
                <p><strong>Nội dung:</strong></p>
                <p>{message}</p>
                """
        };

        await resend.EmailSendAsync(msg);
    }
}