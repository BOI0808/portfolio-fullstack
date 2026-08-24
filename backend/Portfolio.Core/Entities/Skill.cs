namespace Portfolio.Core.Entities;

public class Skill : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public short ProficiencyLevel { get; set; }
    public string? IconUrl { get; set; }
    public int SortOrder { get; set; }
}