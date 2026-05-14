import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe implements OnInit {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  sendStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  errorMessage = '';

  ngOnInit() {
    emailjs.init('bLCSUBdBPb70rHOPO');
  }

  onSubmit() {
    if (
      !this.contactData.name ||
      !this.contactData.email ||
      !this.contactData.subject ||
      !this.contactData.message
    ) {
      this.sendStatus = 'error';
      this.errorMessage = 'Todos los campos son requeridos';
      return;
    }

    this.sendStatus = 'sending';

    const templateParams = {
      name: this.contactData.name, // Conecta con {{name}}
      email: this.contactData.email, // Conecta con {{email}}
      title: this.contactData.subject, // Conecta con {{title}}
      message: this.contactData.message, // Conecta con {{message}}
      to_email: 'ivothaielvicencio@gmail.com',
    };

    emailjs.send('service_4kq4j07', 'template_fd4lwap', templateParams).then(
      (response) => {
        console.log('Email enviado exitosamente:', response);
        this.sendStatus = 'success';
        this.contactData = { name: '', email: '', subject: '', message: '' };

        setTimeout(() => (this.sendStatus = 'idle'), 5000);
      },
      (error) => {
        console.error('Error al enviar email:', error);
        this.sendStatus = 'error';
        this.errorMessage = 'Error al enviar el mensaje. Por favor intenta nuevamente.';

        setTimeout(() => (this.sendStatus = 'idle'), 5000);
      },
    );
  }
}
