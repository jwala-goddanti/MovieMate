import { Component } from '@angular/core';
import  jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-download', // Use the correct selector
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  generatePDF() {
    const content = document.getElementById('pdf-content')!; 
    
    html2canvas(content).then(canvas => {
      // Create a PDF with jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const image = canvas.toDataURL('image/png');
      
      pdf.addImage(image, 'PNG', 0, 0, 210, 297); 
      pdf.save('MovieMateTicket.pdf'); 
    });
  }
}
