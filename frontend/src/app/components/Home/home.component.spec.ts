import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieService } from 'src/app/services/movies.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [MovieService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    // Get an instance of the MovieService
    movieService = TestBed.inject(MovieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies', () => {
    const movies = [{ title: 'Leo' }, { title: 'Guntur Karam' }];
   // spyOn(movieService, 'getMovies').and.returnValue(of(movies));
    component.ngOnInit();
    expect(component.movies).toEqual(movies);
  });
});
