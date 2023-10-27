import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contactus.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsComponent],
    });

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
