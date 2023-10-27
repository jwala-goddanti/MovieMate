using AngularAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularAPI.Context;

namespace AngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly AppDbContext _context; 

        public CityController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cities
        [HttpGet]
        public ActionResult<IEnumerable<City>> GetCities()
        {
            var cities = _context.Cities.ToList();
            return Ok(cities);
        }

        // GET: api/cities/5
        [HttpGet("{id}")]
        public ActionResult<City> GetCity(int id)
        {
            var city = _context.Cities.Find(id);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        // POST: api/cities
        [HttpPost]
        public ActionResult<City> PostCity(City city)
        {
            _context.Cities.Add(city);
            _context.SaveChanges();

            return CreatedAtAction("GetCity", new { id = city.CityID }, city);
        }

        // PUT: api/cities/5
        [HttpPut("{id}")]
        public IActionResult PutCity(int id, City city)
        {
            if (id != city.CityID)
            {
                return BadRequest();
            }

            _context.Entry(city).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
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

        // DELETE: api/cities/5
        [HttpDelete("{id}")]
        public ActionResult<City> DeleteCity(int id)
        {
            var city = _context.Cities.Find(id);

            if (city == null)
            {
                return NotFound();
            }

            _context.Cities.Remove(city);
            _context.SaveChanges();

            return city;
        }

        private bool CityExists(int id)
        {
            return _context.Cities.Any(e => e.CityID == id);
        }
    }
}
