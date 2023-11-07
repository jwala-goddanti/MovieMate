import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})

export class SeatComponent implements OnInit {
  public seats: any[] = [];
  public noofseats: number =0;
  public selectedSeats:any[]=[];
  public seatSelected:any[]=[];

  constructor(private seatService: SeatService) { }

  ngOnInit() {
    this.seatService.getSeats().subscribe((data: any[]) => {
      this.seats = data;
      console.log(data);
    });
  }

  selectSeat(selectedseat: any) {
    this.selectedSeats.push(selectedseat);
    this.seatSelected=selectedseat;
      }
}
