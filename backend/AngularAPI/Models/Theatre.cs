using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularAPI.Models
{
    public class Theatre
    {
        [Key]
        public int TheaterID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int noofseats {  get; set; }

        [ForeignKey("City")]
        public int CityID { get; set; } 

        public City City { get; set; } 
    }
}
