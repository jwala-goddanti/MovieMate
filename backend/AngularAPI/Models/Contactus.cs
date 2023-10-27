﻿using System.ComponentModel.DataAnnotations;

namespace AngularAPI.Models
{
    public class Contactus
        {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Message { get; set; }
    }
}