import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SeatService {
  seats: any[] = [];
    
  constructor(private http: HttpClient) {}

  public SeatApiUrl = 'https://localhost:44348/api/Seat/';
  
  getSeats(){
    return this.http.get<any []>(this.SeatApiUrl);
  }
  
  getSeatById(id: number){
    const url = `${this.SeatApiUrl}${id}`;
    return this.http.get<any []>(url);
  }

}
