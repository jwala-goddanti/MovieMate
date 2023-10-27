using AngularAPI.Context;
using AngularAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;


namespace AngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactusController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitContactForm([FromBody] Contactus contactUs)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Add the form data to the context and save to the database
                _context.Contactus.Add(contactUs);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Form submitted successfully" });
            }
            catch (Exception ex)
            {
                // Handle unexpected errors
                return StatusCode(500, new { Message = "An error occurred" });
            }
        }

    }
}