import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}


  private MovieApiUrl = 'https://localhost:44348/api/Movie/';
  
 
  getMovies() {
    return this.http.get<string[]>(this.MovieApiUrl);
  }

  getMovieDetails(movieId: number){
    const url = `${this.MovieApiUrl}${movieId}`; 
    return this.http.get<any []>(url);
  }

  filterMoviesByLanguage(language: string) {
    return this.http.get<string[]>(this.MovieApiUrl).pipe(
      map((movies: any[]) => {
        return movies.filter((movie) => !language || movie.language === language);
      })
    );
  }

  filterMoviesByRatings(rating: number) {
    return this.http.get<string[]>(this.MovieApiUrl).pipe(
      map((movies: any[]) => {
        return movies.filter((movie) => !rating || movie.rating >= rating);
      })
    );
  }
  
}
