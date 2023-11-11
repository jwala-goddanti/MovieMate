import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theatre } from 'src/app/models/theatre.model';


@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private apiUrl = 'https://localhost:44348/api/theatres/'; 

  constructor(private http: HttpClient) {}

  getTheatres(): Observable<Theatre[]> {
    return this.http.get<Theatre[]>(this.apiUrl);
  }

  getTheatre(id: string) {
    return this.http.get<any[]>(`${this.apiUrl}${id}`);
  }

  addTheatre(theatre: Theatre): Observable<Theatre> {
    return this.http.post<Theatre>(this.apiUrl, theatre);
  }

  updateTheatre(id: number, theatre: Theatre): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, theatre);
  }

  deleteTheatre(id: number): Observable<Theatre> {
    return this.http.delete<Theatre>(`${this.apiUrl}/${id}`);
  }

  getTheatresByCity(cityId: number) {
    return this.http.get<any []>(`${this.apiUrl}/getTheatresByCities/${cityId}`);
  }
}
