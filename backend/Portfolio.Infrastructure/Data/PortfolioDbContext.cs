using Microsoft.EntityFrameworkCore;
using Portfolio.Core.Entities;

namespace Portfolio.Infrastructure.Data;

public class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
{
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>().ToTable("Projects");
        modelBuilder.Entity<Skill>().ToTable("Skills");
        modelBuilder.Entity<Experience>().ToTable("Experiences");
        modelBuilder.Entity<ContactMessage>().ToTable("ContactMessages");
        modelBuilder.Entity<AdminUser>().ToTable("AdminUsers");

        // PostgreSQL array columns
        modelBuilder.Entity<Project>()
            .Property(p => p.TechStack)
            .HasColumnType("text[]");

        modelBuilder.Entity<Project>()
            .Property(p => p.Highlights)
            .HasColumnType("text[]");

        modelBuilder.Entity<Experience>()
            .Property(e => e.Technologies)
            .HasColumnType("text[]");
    }
}