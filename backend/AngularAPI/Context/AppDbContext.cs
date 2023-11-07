using AngularAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Movies> Movies { get; set; }
        public DbSet<Contactus> Contactus { get; set; }

        public DbSet<City> Cities { get; set; }
        public DbSet<Theatre> Theatres { get; set; }
        public DbSet<MovieTheatre> MovieTheatres { get; set; }
        public DbSet<Seat> Seats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<User>().ToTable("users");
            modelbuilder.Entity<City>()
                .HasKey(m => m.CityID);
            modelbuilder.Entity<Movies>()
                .HasKey(m => m.MovieID);
            modelbuilder.Entity<Theatre>()
                .HasKey(m => m.TheaterID);
            modelbuilder.Entity<MovieTheatre>().HasKey(m => m.MovieTheaterID);
            modelbuilder.Entity<Contactus>().ToTable("contactus");
            modelbuilder.Entity<Seat>().ToTable("seats");

        }
    }
}
