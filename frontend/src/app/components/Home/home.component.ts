import { Component, OnInit } from '@angular/core';
import {MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public movies: any[] = [];
                  
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any[]) => {
      this.movies = data;
    });
  }


    
  }
