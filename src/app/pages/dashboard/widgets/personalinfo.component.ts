import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-personalinfo',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <h2><mat-icon>person</mat-icon> Persoonlijke Informatie</h2>
    <p><mat-icon>account_circle</mat-icon> Naam: <strong>Oscar de Jong</strong></p>
    <p><mat-icon>home</mat-icon> Straat: Kees Geenenstraat 8</p>
    <p><mat-icon>email</mat-icon> Email: <a href="mailto:oscar.dejong.123&#64;gmail.com">oscar.dejong.123&#64;gmail.com</a></p>
    <p><mat-icon>phone</mat-icon> Telefoon: <a href="tel:0612345678">06 1234 5678</a></p>
  `,
  styles: [`
    mat-icon {
      vertical-align: middle;
      margin-right: 8px;
    }
    a {
      text-decoration: none;
      color: #007BFF;
    }
  `]
})
export class PersonalinfoComponent { }
