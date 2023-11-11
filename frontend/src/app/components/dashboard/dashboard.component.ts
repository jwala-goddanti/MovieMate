import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { MovieService } from 'src/app/services/movies.service';
import { MovieTheatreService } from 'src/app/services/movietheatre.service';
import { CityService } from 'src/app/services/cities.service';
import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { TheatreService } from 'src/app/services/theatres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public movie: any = [];
  public cities: any = [];
  public selectedCity: number = 1;
  selectedLanguage: string='' ;
  selectedRating: number=0;
  filteredMovies: any[] = [];
  public theatres: any =[];
  public movieId: number =1;
  movieFilter: string = '';

  public users:any = [];
  public role!:string;

  public fullName : string = "";

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private movies: MovieService,
    private movietheatres: MovieTheatreService,
    private city:CityService,
    private theatreservice: TheatreService,
    private router: Router
  ) {}

  ngOnInit() {

                                         
    this.movies.getMovies().subscribe((data: any[]) => {
      this.movie = data;
    });

    this.city.getCities().subscribe((citydata: any[]) => {
      this.cities = citydata;
      
    });

   
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });


    this.userStore.getRoleFromStore().subscribe((val: string | null) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    console.log('Full name: ',this.fullName);
  }

  logout() {
    this.auth.signOut();
  }

  onCityChange() {
    if (this.selectedCity) {
      this.movietheatres.getMoviesByCity(this.selectedCity).subscribe((movies: any[]) => {
        this.movie = movies;
        
         });

        }
  }

  applyFilterLanguage() {
     
      this.movies.filterMoviesByLanguage(this.selectedLanguage).subscribe((movie: any[]) => {
        this.filteredMovies = movie;
        this.movie = movie;
      });
    
  }

  applyFilterRating(){
    
    this.movies.filterMoviesByRatings(this.selectedRating).subscribe((movie: any[]) => {
      this.movie = movie;
      this.filteredMovies = movie;
    });
    
 
  }

  searchMovies() {
    if (this.movieFilter) {
        this.movie = this.movie.filter((movie: any) =>
        movie.title.toLowerCase().includes(this.movieFilter.toLowerCase())
      );
    } else {
      this.movie = this.filteredMovies;
      
    }
  }
 
  getMovieTheatres(mId: number) {
       
      this.movieId = mId;
      this.router.navigate(['/theatres',this.movieId, this.selectedCity]);
    }
   
}
         
        









