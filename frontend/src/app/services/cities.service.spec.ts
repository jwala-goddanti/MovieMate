import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CityService } from './cities.service';

describe('CityService', () => {
  let service: CityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CityService]
    });

    // Inject the service and the testing controller for HTTP requests
    service = TestBed.inject(CityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of cities', () => {
    const expectedCities: string[] = ['City1', 'City2'];

    // Trigger the getCities method
    service.getCities().subscribe(cities => {
      expect(cities).toEqual(expectedCities);
    });

    // Set up a mock HTTP request
    const req = httpTestingController.expectOne(service.CityApiUrl);
    expect(req.request.method).toBe('GET');

    // Respond with the mock data
    req.flush(expectedCities);

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should select a city and retrieve movies', () => {
    const selectedCity = 'City1';
    const cityId = 123;
    const expectedMovies: any[] = [{ title: 'Movie1' }, { title: 'Movie2' }];

    // Trigger the onCitySelected method
    //service.onCitySelected(selectedCity);

    // Set up a mock HTTP request
    const req = httpTestingController.expectOne(`/api/your-controller-name/getmoviesbycity/${cityId}`);
    expect(req.request.method).toBe('GET');

    // Respond with the mock data
    req.flush(expectedMovies);

    // Verify that the selectedCity and movies are updated
    expect(service.selectedCity).toEqual(selectedCity);
    expect(service.movies).toEqual(expectedMovies);

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  afterEach(() => {
    // Ensure there are no outstanding HTTP requests after each test
    httpTestingController.verify();
  });
});
