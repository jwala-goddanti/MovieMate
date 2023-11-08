import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatService } from 'src/app/services/seat.service';
import { ActivatedRoute } from '@angular/router';
import { TheatreService } from 'src/app/services/theatres.service';
import { MovieService } from 'src/app/services/movies.service';
import   jsPDF from 'jspdf';
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
  public totalcost:number=0;
  selectedDate: string |null =null;  
  selectedShow: string |null =null;
  selectedTheatre:string='';
  theatrename: string|null = null;  
  public movieDetails:any[]=[];
  movieid:number=0;
  public moviename: string='';
  public movieposter:any;
  constructor(private seatService: SeatService, private route: ActivatedRoute, private theatreService: TheatreService,
    private movieService: MovieService) { 

  }

  ngOnInit() {
   
      this.route.queryParamMap.subscribe((params) => {
        const movieIdParam = params.get('movieId');
      this.movieid = movieIdParam !== null ? parseInt(movieIdParam, 10) : 0; 
        const selectedCity = params.get('selectedCity');
        this.selectedTheatre = params.get('selectedTheatre')?? '';
        this.selectedDate = params.get('selectedDate');
        this.selectedShow = params.get('selectedShow');
    
       });
        
    this.seatService.getSeats().subscribe((data: any[]) => {
      this.seats = data;
      console.log(data);
    });

   this.theatreService.getTheatre(this.selectedTheatre).subscribe((theatres: any) => {
           this.theatrename = theatres.name;
                                               
      });
  
this.movieService.getMovieDetails(this.movieid).subscribe((movie: any) =>{
    this.movieDetails = movie;
    this.moviename = movie.title;
    this.movieposter=movie.posterurl;

});

                
    const min = 0; 
    const max = 72; 

    this.bookedseats = this.generateNaturalNumbersBetween(min, max);
    console.log(this.bookedseats);
  }
 
 

  selectSeat(selectedseat: any) {
    if (!this.selectedSeats.includes(selectedseat)) {
    this.selectedSeats.push(selectedseat);
    this.seatSelected = selectedseat;
    this.noofseatsSelected= this.selectedSeats.length;
    this.totalcost = this.calculateTotalCost();
    }
  }

  getRandomnum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getTicket(){
    this.generatePDF();
  }
  generateNaturalNumbersBetween(min: number, max: number): number[] {
    if (min >= max) {
      throw new Error('Invalid range: min must be less than max.');
    }

    const n = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random value of n in the specified range
    const naturalNumbers: number[] = [];

    for (let i = 0; i < n; i++) {
      naturalNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return naturalNumbers;
  }
  calculateTotalCost(): number {
    let cost = 0;
    for (const seat of this.selectedSeats) {
      const selectedSeat = this.seats.find(row => row.seatName === seat);
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
        const imgWidth = 297; // Use A4 page width (297 mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // Optimize image data by resizing it
        const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
  
        const pdf = new jsPDF('l', 'mm', 'a4'); // Set page orientation to landscape ('l')
  
        const xCoordinate = 10; // Specify the X-coordinate
        const yCoordinate = 10; // Specify the Y-coordinate
  
        pdf.addImage(contentDataURL, 'JPEG', xCoordinate, yCoordinate, imgWidth, imgHeight);
  
        // Save the PDF as a download link
        pdf.save('MovieMateTicket.pdf');
      }).catch((error) => {
        console.error('Error generating PDF:', error);
      });
    }
  }
}
   
  