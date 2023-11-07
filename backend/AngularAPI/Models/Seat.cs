using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAPI.Models
{
    public class Seat
    {
        [Key]
        public int SeatId { get; set; }

        public string SeatName { get; set; }
        public SeatType SeatType { get; set; }
        public Boolean isBooked { get; set; }
        public double Price { get; set; }
        [ForeignKey("MovieTheatreID")]
        public int MovieTheatreID { get; set; }
        public MovieTheatre movieTheatre { get; set; }
    }
    public enum SeatType
    {
        DELUX,
        VIP,
        ECONOMY,
        OTHER
    }

}

