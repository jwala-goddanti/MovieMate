using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAPI.Models
{
    public class MovieTheatre
    {
        [Key]
        public int MovieTheaterID { get; set; }
        [ForeignKey("Movies")]
        public int MovieID { get; set; } 
        [ForeignKey("Theatre")]
        public int TheaterID { get; set; }
        [Required]
        public String ScreenName {  get; set; }

        [Required]
        public int TicketCost { get; set; }

        public Movies Movie { get; set; } 
        public Theatre Theatre { get; set; }
    }
}
