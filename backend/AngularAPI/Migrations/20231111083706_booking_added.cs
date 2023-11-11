using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularAPI.Migrations
{
    /// <inheritdoc />
    public partial class booking_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bookings",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MovieTheatreID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    movieTheatreMovieTheaterID = table.Column<int>(type: "int", nullable: true),
                    userName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Id = table.Column<int>(type: "int", nullable: false),
                    SelectedDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedShow = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedSeats = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    totalcost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bookings", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_bookings_MovieTheatres_movieTheatreMovieTheaterID",
                        column: x => x.movieTheatreMovieTheaterID,
                        principalTable: "MovieTheatres",
                        principalColumn: "MovieTheaterID");
                    table.ForeignKey(
                        name: "FK_bookings_users_Id",
                        column: x => x.Id,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_bookings_Id",
                table: "bookings",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_bookings_movieTheatreMovieTheaterID",
                table: "bookings",
                column: "movieTheatreMovieTheaterID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bookings");
        }
    }
}
