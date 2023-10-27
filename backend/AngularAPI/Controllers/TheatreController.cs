using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularAPI.Models;
using AngularAPI.Context;

namespace AngularAPI.Controllers
{
    [Route("api/theatres")]
    [ApiController]
    public class TheatreController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TheatreController(AppDbContext context)
        {
            _context = context;
        }

       

        // GET: api/theatres
        [HttpGet]
        public ActionResult<IEnumerable<Theatre>> GetTheatres()
        {
            var theatres = _context.Theatres.ToList();
            return Ok(theatres);
        }

        // GET: api/theatres/5
        [HttpGet("{id}")]
        public ActionResult<Theatre> GetTheatre(int id)
        {
            var theatre = _context.Theatres.Find(id);

            if (theatre == null)
            {
                return NotFound();
            }

            return Ok(theatre);
        }

        // POST: api/theatres
        [HttpPost]
        public ActionResult<Theatre> PostTheatre(Theatre theatre)
        {
            _context.Theatres.Add(theatre);
            _context.SaveChanges();

            return CreatedAtAction("GetTheatre", new { id = theatre.TheaterID }, theatre);
        }

        // PUT: api/theatres/5
        [HttpPut("{id}")]
        public IActionResult PutTheatre(int id, Theatre theatre)
        {
            if (id != theatre.TheaterID)
            {
                return BadRequest();
            }

            _context.Entry(theatre).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheatreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/theatres/5
        [HttpDelete("{id}")]
        public ActionResult<Theatre> DeleteTheatre(int id)
        {
            var theatre = _context.Theatres.Find(id);

            if (theatre == null)
            {
                return NotFound();
            }

            _context.Theatres.Remove(theatre);
            _context.SaveChanges();

            return theatre;
        }

        // GET: api/theatres/getTheatresByCities/5
        [HttpGet("getTheatresByCities/{cityId}")]
        public ActionResult<IEnumerable<Theatre>> GetTheatresByCities(int cityId)
        {
            var theatres = _context.Theatres.Where(t => t.CityID == cityId).ToList();
            return Ok(theatres);
        }



        private bool TheatreExists(int id)
        {
            return _context.Theatres.Any(e => e.TheaterID == id);
        }

    }
}
