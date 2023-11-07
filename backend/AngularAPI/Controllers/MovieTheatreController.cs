using AngularAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularAPI.Context;

namespace AngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieTheatreController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MovieTheatreController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/movietheatres
        [HttpGet]
        public ActionResult<IEnumerable<MovieTheatre>> GetMovieTheatres()
        {
            var movieTheatres = _context.MovieTheatres.ToList();
            return Ok(movieTheatres);
        }

        // GET: api/movietheatres/5
        [HttpGet("{id}")]
        public ActionResult<MovieTheatre> GetMovieTheatre(int id)
        {
            var movieTheatre = _context.MovieTheatres.Find(id);

            if (movieTheatre == null)
            {
                return NotFound();
            }

            return Ok(movieTheatre);
        }

        // POST: api/movietheatres
        [HttpPost]
        public ActionResult<MovieTheatre> PostMovieTheatre(MovieTheatre movieTheatre)
        {
            _context.MovieTheatres.Add(movieTheatre);
            _context.SaveChanges();

            return CreatedAtAction("GetMovieTheatre", new { id = movieTheatre.MovieTheaterID }, movieTheatre);
        }

        // PUT: api/movietheatres/5
        [HttpPut("{id}")]
        public IActionResult PutMovieTheatre(int id, MovieTheatre movieTheatre)
        {
            if (id != movieTheatre.MovieTheaterID)
            {
                return BadRequest();
            }

            _context.Entry(movieTheatre).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieTheatreExists(id))
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

        // DELETE: api/movietheatres/5
        [HttpDelete("{id}")]
        public ActionResult<MovieTheatre> DeleteMovieTheatre(int id)
        {
            var movieTheatre = _context.MovieTheatres.Find(id);

            if (movieTheatre == null)
            {
                return NotFound();
            }

            _context.MovieTheatres.Remove(movieTheatre);
            _context.SaveChanges();

            return movieTheatre;
        }

        // Custom Action: Get movies by TheatreID
        [HttpGet("getmoviesbytheatre/{theatreId}")]
        public ActionResult<IEnumerable<MovieTheatre>> GetMoviesByTheatre(int theatreId)
        {
            var moviesByTheatre = _context.MovieTheatres
                .Where(mt => mt.TheaterID == theatreId)
                .ToList();
            return Ok(moviesByTheatre);
        }

        // Custom Action: Get movies by CityID
        [HttpGet("getmoviesbycity/{cityId}")]
        public ActionResult<IEnumerable<MovieTheatre>> GetMoviesByCity(int cityId)
        {
            var moviesByCity = _context.MovieTheatres
        .Where(mt => mt.Theatre.CityID == cityId)
        .Select(mt => mt.Movie)
        .Distinct()
        .ToList();
         return Ok(moviesByCity);
        }

        private bool MovieTheatreExists(int id)
        {
            return _context.MovieTheatres.Any(e => e.MovieTheaterID == id);
        }

        [HttpGet("getMovieTheatresByMovieAndCity/{movieId}/{selectedCity}")]
        public ActionResult<IEnumerable<MovieTheatre>> GetMovieTheatresByMovieAndCity(int movieId, int selectedCity)
        {
            
            var movieTheatres = _context.MovieTheatres
                .Include(mt => mt.Theatre) 
                .Where(mt => mt.MovieID == movieId && mt.Theatre.CityID == selectedCity)
                .ToList();

            return Ok(movieTheatres);
        }

        // POST: api/MovieTheatre/AddSeats
        [HttpPost("AddSeats/{movieTheatreID}")]
        public async Task<IActionResult> AddSeats(int movieTheatreID, [FromBody] List<Seat> seats)
        {
            // Check if the movie theater exists
            var movieTheatre = await _context.MovieTheatres.Include(mt => mt.seats)
                .FirstOrDefaultAsync(mt => mt.MovieTheaterID == movieTheatreID);

            if (movieTheatre == null)
            {
                return NotFound(); // Return a 404 Not Found response if the movie theater is not found.
            }

            // Add the seats to the movie theater
            foreach (var seat in seats)
            {
                seat.MovieTheatreID = movieTheatre.MovieTheaterID;
                movieTheatre.seats.Add(seat);
            }

            try
            {
                await _context.SaveChangesAsync(); // Save changes to the database
                return Ok(); // Return a 200 OK response if the seats are added successfully.
            }
            catch (DbUpdateException)
            {
                return BadRequest("Failed to add seats."); // Return a 400 Bad Request response in case of an error.
            }
        }
    }
}
  

