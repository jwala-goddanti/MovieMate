import { Component, OnInit } from '@angular/core';
import { MovieTheatreService } from 'src/app/services/movietheatre.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movies.service';
import { CityService } from 'src/app/services/cities.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
  next7Dates: Date[] = [];
  public selectedDate: Date |null = null;
  public selectedShow: string='';
  showTimings: string[] = [];
  filteredTimings: string[] = [];
  public selectedTheatre:string='';
  public selectedShowTimes: { [theatreId: string]: string } = {};


  constructor(private mtservice: MovieTheatreService, private route: ActivatedRoute, private ms:MovieService,
    private cityservice: CityService, private datePipe: DatePipe, private router:Router) {
     
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        const formattedDate = this.datePipe.transform(currentDate, 'shortDate');
        if (formattedDate) {
          this.next7Dates.push(currentDate);
        }
      }
        
      this.showTimings = ['10:30 AM', '02:30 PM', '06:30 PM', '09:30 PM'];
    }


  selectDate(date: Date) {
    this.selectedDate = date;
    this.filterTimings();
    
  }

  filterTimings() {
    if (!this.selectedDate && !this.selectedTheatre) {
      this.filteredTimings = [];
      return;
    }

    
    const currentSystemDate = new Date();
    const selectedDate = this.selectedDate as Date;

    if (currentSystemDate.toDateString() === selectedDate.toDateString()) {
      
      const currentSystemTime = new Date();
      const currentHours = currentSystemTime.getHours();
      const currentMinutes = currentSystemTime.getMinutes();
    
      
      this.filteredTimings = this.showTimings.filter(timing => {
        const[showtime,ampm] = timing.split(' ');
        var [showHours, showMinutes] = showtime.split(':').map(Number);
        if(ampm==='PM') showHours=showHours+12;
        if (
          showHours > currentHours ||
          (showHours === currentHours && showMinutes > currentMinutes)
        ) {
          return true;  
        }
        return false; 
      });
    } else {
      
      this.filteredTimings = this.showTimings;
    }
  }
  
      
  selectShow(theatreId: string, timing: string) {
        this.selectedShowTimes[theatreId] = timing;
        this.selectedShow=timing;
  }
selectTheatre(theatreId: string){
  this.selectedTheatre = theatreId;
  
}

selectSeats(){
  this.router.navigate(['/seats'], {
    queryParams: {
      movieId: this.movieId,
      selectedCity: this.selectedCity,
      selectedTheatre: this.selectedTheatre,
      selectedDate: this.selectedDate?.toDateString(),
      selectedShow: this.selectedShow,
    },
  });
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
      console.log(theatreDetails);
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
