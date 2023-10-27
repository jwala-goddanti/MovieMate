import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TheatreComponent } from './theatres.component';
import { TheatreService } from 'src/app/services/theatres.service';
import { of } from 'rxjs';

describe('TheatreComponent', () => {
  let component: TheatreComponent;
  let fixture: ComponentFixture<TheatreComponent>;
  let theatreService: jasmine.SpyObj<TheatreService>;

  beforeEach(() => {
    const theatreServiceSpy = jasmine.createSpyObj('TheatreService', ['getTheatres']);
    
    TestBed.configureTestingModule({
      declarations: [TheatreComponent],
      providers: [
        { provide: TheatreService, useValue: theatreServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(TheatreComponent);
    component = fixture.componentInstance;
    theatreService = TestBed.inject(TheatreService) as jasmine.SpyObj<TheatreService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  }
);
