namespace Portfolio.Core.Entities;

public class Project : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] TechStack { get; set; } = [];
    public string? LiveUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? ThumbnailUrl { get; set; }
    public bool IsFeatured { get; set; }
    public int SortOrder { get; set; }
    public string[] Highlights { get; set; } = [];
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}