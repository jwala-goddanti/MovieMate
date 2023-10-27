using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

using AngularAPI.Context;
using AngularAPI.Models;

namespace AngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MovieController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Movie
        [HttpGet]
        public IEnumerable<Movies> GetMovies()
        {
            return _context.Movies;
        }

        // GET: api/Movie/5
        [HttpGet("{id}")]
        public ActionResult<Movies> GetMovie(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // POST: api/Movie
        [HttpPost]
        public ActionResult<Movies> PostMovie(Movies movie)
        {
            _context.Movies.Add(movie);
            _context.SaveChanges();

            return CreatedAtAction("GetMovie", new { id = movie.MovieID }, movie);
        }

        // PUT: api/Movie/5
        [HttpPut("{id}")]
        public IActionResult PutMovie(int id, Movies movie)
        {
            if (id != movie.MovieID)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (Exception)
            {
                if (!MovieExists(id))
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

        // DELETE: api/Movie/5
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            _context.SaveChanges();

            return NoContent();
        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(m => m.MovieID == id);
        }
    }
}

