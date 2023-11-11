import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movies.service';
import { SeatService } from 'src/app/services/seat.service';
import { TheatreService } from 'src/app/services/theatres.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-seat',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})

export class SeatComponent implements OnInit {
  public seats: any[] = [];
  public noofseatsSelected: number = 0;
  public selectedSeats: any[] = [];
  public seatSelected: any[] = [];
  public seattype: any[] = ['DELUX', 'VIP', 'ECONOMY', 'OTHERS'];
  public randnum: number = 0;
  public bookedseats: number[] = [];
  public totalcost: number = 0;
  selectedDate: string | null = null;
  selectedShow: string | null = null;
  selectedTheatre: string = '';
  theatrename: string | null = null;
  screenid: string | null = null;
  screenName: string | null = null;
  public movieDetails: any[] = [];
  movieid: number = 0;
  public moviename: string = '';
  public movieposter: any;
  public userName: string = '';

  constructor(
    private seatService: SeatService,
    private route: ActivatedRoute,
    private theatreService: TheatreService,
    private movieService: MovieService,
    private bookingService: BookingService,
    private authService: AuthService,
    private userService: UserStoreService,
  ) {
    
    
    
  }

  ngOnInit() {
    this.userService.getFullNameFromStore()
.subscribe(val=>{
  const fullNameFromToken = this.authService.getfullNameFromToken();
  this.userName = val || fullNameFromToken
});
    
    
      this.route.queryParamMap.subscribe((params) => {
      const movieIdParam = params.get('movieId');
      this.movieid = movieIdParam !== null ? parseInt(movieIdParam, 10) : 0;
      const selectedCity = params.get('selectedCity');
      this.selectedTheatre = params.get('selectedTheatre') ?? '';
      this.selectedDate = params.get('selectedDate');
      this.selectedShow = params.get('selectedShow');
      this.screenid = params.get('screenid');
      this.screenName = params.get('screenName');
    });
    
    

    this.seatService.getSeats().subscribe((data: any[]) => {
      this.seats = data;
      });

    this.theatreService.getTheatre(this.selectedTheatre).subscribe((theatres: any) => {
      this.theatrename = theatres.name;
    });

    this.movieService.getMovieDetails(this.movieid).subscribe((movie: any) => {
      this.movieDetails = movie;
      this.moviename = movie.title;
      this.movieposter = movie.posterurl;
    });

    const min = 0;
    const max = 72;

    this.bookedseats = this.generateNaturalNumbersBetween(min, max);
  

   
   
  }

  selectSeat(selectedseat: any) {
    if (!this.selectedSeats.includes(selectedseat)) {
      this.selectedSeats.push(selectedseat);
      this.seatSelected = selectedseat;
      this.noofseatsSelected = this.selectedSeats.length;
      this.totalcost = this.calculateTotalCost();
    }
  }

  getTicket() {
      if (this.userName) {
      this.bookingService
        .createBooking(
          this.screenid,
          this.userName,
          this.selectedDate,
          this.selectedShow,
          this.selectedSeats,
          this.totalcost,
        )
        .subscribe(
          (response) => {
            console.log('Booking created successfully', response);
           
                              },
          (error) => {
            console.error('Error creating the booking', error);
            
          }
        );
    } else {
      console.error('User is not authenticated. Please log in.');
     
    }
    this.generatePDF();
  }

  getRandomnum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  generateNaturalNumbersBetween(min: number, max: number): number[] {
    if (min >= max) {
      throw new Error('Invalid range: min must be less than max.');
    }

    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    const naturalNumbers: number[] = [];

    for (let i = 0; i < n; i++) {
      naturalNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return naturalNumbers;
  }

  calculateTotalCost(): number {
    let cost = 0;
    for (const seat of this.selectedSeats) {
      const selectedSeat = this.seats.find((row) => row.seatName === seat);
      if (selectedSeat) {
        cost += selectedSeat.price;
      }
    }
    return cost;
  }

  generatePDF() {
    const content = document.getElementById('ticket-pdf');

    if (content) {
      html2canvas(content).then((canvas) => {
        const imgWidth = 280;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);

        const pdf = new jsPDF('l', 'mm', 'a4');

        const xCoordinate = 10;
        const yCoordinate = 10;
        pdf.addImage(contentDataURL, 'JPEG', xCoordinate, yCoordinate, imgWidth, imgHeight);

        pdf.save('MovieMateTicket.pdf');
      }).catch((error) => {
        console.error('Error generating PDF:', error);
      });
    }
  }
}
