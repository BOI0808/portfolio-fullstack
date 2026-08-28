namespace Portfolio.API.Services;

public class RevalidateService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public RevalidateService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task TriggerRevalidateAsync()
    {
        var frontendUrl = _config["FrontendUrl"];
        var secret = _config["RevalidateSecret"];

        var request = new HttpRequestMessage(HttpMethod.Post, $"{frontendUrl}/api/revalidate");
        request.Headers.Add("x-revalidate-secret", secret);

        await _httpClient.SendAsync(request);
    }
}