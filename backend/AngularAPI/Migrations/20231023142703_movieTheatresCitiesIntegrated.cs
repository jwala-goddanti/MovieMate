using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularAPI.Migrations
{
    /// <inheritdoc />
    public partial class movieTheatresCitiesIntegrated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScreenName",
                table: "Theatres");

            migrationBuilder.CreateTable(
                name: "MovieTheatres",
                columns: table => new
                {
                    MovieTheaterID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MovieID = table.Column<int>(type: "int", nullable: false),
                    TheaterID = table.Column<int>(type: "int", nullable: false),
                    ScreenName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Showtime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieTheatres", x => x.MovieTheaterID);
                    table.ForeignKey(
                        name: "FK_MovieTheatres_Movies_MovieID",
                        column: x => x.MovieID,
                        principalTable: "Movies",
                        principalColumn: "MovieID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieTheatres_Theatres_TheaterID",
                        column: x => x.TheaterID,
                        principalTable: "Theatres",
                        principalColumn: "TheaterID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieTheatres_MovieID",
                table: "MovieTheatres",
                column: "MovieID");

            migrationBuilder.CreateIndex(
                name: "IX_MovieTheatres_TheaterID",
                table: "MovieTheatres",
                column: "TheaterID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieTheatres");

            migrationBuilder.AddColumn<string>(
                name: "ScreenName",
                table: "Theatres",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
