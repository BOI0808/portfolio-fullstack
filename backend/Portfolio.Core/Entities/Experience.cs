namespace Portfolio.Core.Entities;

public class Experience : BaseEntity
{
    public string Company { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string[] Technologies { get; set; } = [];
}