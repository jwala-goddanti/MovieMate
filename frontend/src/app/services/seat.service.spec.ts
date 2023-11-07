import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeatService } from './seat.service';

describe('SeatService', () => {
  let service: SeatService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeatService],
    });

    service = TestBed.inject(SeatService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve seats from the API via GET', () => {
    const mockSeats = ['Seat1', 'Seat2', 'Seat3'];

    service.getSeats().subscribe(seats => {
      expect(seats).toEqual(mockSeats);
    });

    const req = httpTestingController.expectOne(service.SeatApiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSeats);
  });

  it('should retrieve a seat by ID from the API via GET', () => {
    const mockSeat = 'Seat1';
    const seatId = 1;

    service.getSeatById(seatId).subscribe(seat => {
      expect(seat).toEqual(mockSeat);
    });

    const req = httpTestingController.expectOne(`${service.SeatApiUrl}${seatId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSeat);
  });
});
