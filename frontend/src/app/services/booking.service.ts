import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingApiUrl = 'https://localhost:44348/api/Booking/';
  constructor(private http: HttpClient) {}
    createBooking(screenId: string|null, userName: string|null, selectedDate: string|null, selectedShow: string|null, selectedSeats: string[],totalcost: number): Observable<any> {
      const selectedSeatsString = selectedSeats.join(' ');
      const bookingData = {
        MovieTheatreID: screenId,
        userName: userName,
        SelectedDate: selectedDate,
        SelectedShow: selectedShow,
        SelectedSeats: selectedSeatsString,
        totalcost: totalcost,
      };
  
      return this.http.post(this.bookingApiUrl, bookingData);
    }

   }

