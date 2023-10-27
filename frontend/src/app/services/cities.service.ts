import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CityService {
  cities: string[] = [];
  selectedCity: string | null = null;
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  public CityApiUrl = 'https://localhost:44348/api/City/';
  
  getCities(){
    return this.http.get<any []>(this.CityApiUrl);
  }
  
  getCityById(id: number){
    const url = `${this.CityApiUrl}${id}`;
    return this.http.get<any []>(url);
  }

}
