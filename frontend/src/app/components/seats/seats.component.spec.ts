import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SeatComponent } from './seats.component';
import { SeatService } from 'src/app/services/seat.service';

describe('SeatComponent', () => {
  let component: SeatComponent;
  let fixture: ComponentFixture<SeatComponent>;
  let mockSeatService: jasmine.SpyObj<SeatService>;

  beforeEach(() => {
    mockSeatService = jasmine.createSpyObj('SeatService', ['getSeats']);
    TestBed.configureTestingModule({
      declarations: [SeatComponent],
      providers: [{ provide: SeatService, useValue: mockSeatService }],
    });

    fixture = TestBed.createComponent(SeatComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load seats from the service', () => {
    const mockSeats = [{ SeatName: 'A1' }, { SeatName: 'A2' }, { SeatName: 'A3' }];
    mockSeatService.getSeats.and.returnValue(of(mockSeats));

    fixture.detectChanges();

    expect(component.seats).toEqual(mockSeats);
  });
});
