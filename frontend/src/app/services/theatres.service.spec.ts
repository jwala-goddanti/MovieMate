import { TestBed } from '@angular/core/testing';
import { TheatreService } from './theatres.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TheatreService', () => {
  let service: TheatreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TheatreService]
    });
    service = TestBed.inject(TheatreService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more test cases for service methods (getTheatres, getTheatre, addTheatre, updateTheatre, deleteTheatre, getTheatresByCity)
});
