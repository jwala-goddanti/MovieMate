import { Component, OnInit } from '@angular/core';
import { MovieTheatreService } from 'src/app/services/movietheatre.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movies.service';
import { CityService } from 'src/app/services/cities.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})


export class TheatreComponent implements OnInit {
  movieId: number = 1;
  selectedCity: number = 1;
  public theatres: any[] = [];
  public moviedetails: any[] = [];
  public selectedposter: any; 
  public movietitle: string ='';
  public genre: string ='';
  public rating: number = 1;
  public language: string ='';
  public cityname: string='';
 


  constructor(private mtservice: MovieTheatreService, private route: ActivatedRoute, private ms:MovieService,
    private cityservice: CityService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieIdParam = params.get('movieId');
      if (movieIdParam !== null) {
        this.movieId = +movieIdParam;
      }

      const selectedCityParam = params.get('selectedCity');
      if (selectedCityParam !== null) {
        this.selectedCity = +selectedCityParam;
      }
      this.getTheatreDetails(); 
      this.getMovieDetails();
      this.getCityDetails();
    });
  }
    
    getTheatreDetails() {
    this.mtservice.getMovieTheatresByMovieAndCity(this.movieId, this.selectedCity).subscribe((theatreDetails: any[]) => {
      this.theatres = theatreDetails;
                });
  }

  getMovieDetails() {
    this.ms.getMovieDetails(this.movieId).subscribe((movieDetails: any) => {
      this.moviedetails = movieDetails;
      this.selectedposter = movieDetails.posterurl;
      this.language = movieDetails.language;
      this.rating = movieDetails.rating;
      this.movietitle = movieDetails.title;
      this.genre = movieDetails.genre;
      
    });
  }

  getCityDetails(){
    this.cityservice.getCityById(this.selectedCity).subscribe((citydetails: any)=>
    {
        this.cityname = citydetails.cityName;
        console.log(citydetails.cityname);
    });
  }
}
