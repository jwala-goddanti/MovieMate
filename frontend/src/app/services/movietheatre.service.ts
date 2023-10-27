import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieTheatre } from 'src/app/models/movietheatre.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatreService {
  private apiUrl = 'https://localhost:44348/api/MovieTheatre'; // Replace with the actual API endpoint

  constructor(private http: HttpClient) {}
  selectedCity: number =0;
  getMovieTheatres(): Observable<MovieTheatre[]> {
    return this.http.get<MovieTheatre[]>(this.apiUrl);
  }

  getMovieTheatre(id: number): Observable<MovieTheatre> {
    return this.http.get<MovieTheatre>(`${this.apiUrl}/${id}`);
  }

  addMovieTheatre(movieTheatre: MovieTheatre): Observable<MovieTheatre> {
    return this.http.post<MovieTheatre>(this.apiUrl, movieTheatre);
  }

  updateMovieTheatre(id: number, movieTheatre: MovieTheatre): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, movieTheatre);
  }

  deleteMovieTheatre(id: number): Observable<MovieTheatre> {
    return this.http.delete<MovieTheatre>(`${this.apiUrl}/${id}`);
  }

  getMoviesByTheatre(theatreId: number): Observable<MovieTheatre[]> {
    return this.http.get<MovieTheatre[]>(`${this.apiUrl}/getmoviesbytheatre/${theatreId}`);
  }

  getMoviesByCity(cityId: number){
    return this.http.get<String []>(`${this.apiUrl}/getmoviesbycity/${cityId}`);
  }

  getMovieTheatresByMovieAndCity(movieId: number, selectedCity: number) {
    
    return this.http.get<any[]>(
      `${this.apiUrl}/getMovieTheatresByMovieAndCity/${movieId}/${selectedCity}`
    );
  }
}
