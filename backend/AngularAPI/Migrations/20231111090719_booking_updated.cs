using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularAPI.Migrations
{
    /// <inheritdoc />
    public partial class booking_updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bookings_MovieTheatres_movieTheatreMovieTheaterID",
                table: "bookings");

            migrationBuilder.DropIndex(
                name: "IX_bookings_movieTheatreMovieTheaterID",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "movieTheatreMovieTheaterID",
                table: "bookings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "movieTheatreMovieTheaterID",
                table: "bookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_bookings_movieTheatreMovieTheaterID",
                table: "bookings",
                column: "movieTheatreMovieTheaterID");

            migrationBuilder.AddForeignKey(
                name: "FK_bookings_MovieTheatres_movieTheatreMovieTheaterID",
                table: "bookings",
                column: "movieTheatreMovieTheaterID",
                principalTable: "MovieTheatres",
                principalColumn: "MovieTheaterID");
        }
    }
}
