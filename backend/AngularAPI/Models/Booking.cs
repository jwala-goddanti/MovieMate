using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace AngularAPI.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        [Required(ErrorMessage = "Movie Theatre id is required.")]
        public string MovieTheatreID { get; set; }
        [Required(ErrorMessage = "Username is required.")]
        public string userName { get; set; }     
        public string SelectedDate { get; set; }
        public string SelectedShow { get; set; }
        public string SelectedSeats { get; set; }
        [Required(ErrorMessage = "Total cost is required.")]
        public double totalcost { get; set; }
    }
}
