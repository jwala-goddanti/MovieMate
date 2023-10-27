import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ContactUsService } from './../../services/contactus.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactUsComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private contactUsService: ContactUsService,private router: Router, private toast: NgToastService) {
    
   } 

  submitForm() {
    
    const formData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.contactUsService.sendContactForm(formData).subscribe(
      response => {
        this.toast.success({detail: "Response Recorded", summary: response.message, duration: 5000});
        console.log('Form submitted successfully', response);
        this.router.navigate(['home']);
      },
      error => {
        console.error('Form submission failed', error);
      }
    );
  }
}
