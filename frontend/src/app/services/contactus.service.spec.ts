import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactUsService } from './contactus.service';

describe('ContactUsService', () => {
  let service: ContactUsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactUsService]
    });

    service = TestBed.inject(ContactUsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a contact form', () => {
    const formData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      message: 'This is a test message'
    };

    service.sendContactForm(formData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('https://localhost:44348/api/contactus/'); 

    expect(req.request.method).toEqual('POST');
    req.flush({ success: true });

    httpTestingController.verify();
  });
});
