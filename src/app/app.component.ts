import { CommonModule } from '@angular/common';
import { Component, computed, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AccountComponent } from './pages/account/account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    AccountComponent,
  ],
  animations: [
    trigger('sidenavAnimation', [
      state('open', style({ width: '250px' })),
      state('closed', style({ width: '65px' })),
      transition('open <=> closed', animate('800ms ease-in-out'))
    ]),
    trigger('contentAnimation', [
      state('open', style({ marginLeft: '250px' })),
      state('closed', style({ marginLeft: '65px' })),
      transition('open <=> closed', animate('800ms ease-in-out'))
    ])
  ],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened [@sidenavAnimation]="collapsed() ? 'closed' : 'open'">
        <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
      </mat-sidenav>

      <mat-sidenav-content class="content" [@contentAnimation]="collapsed() ? 'closed' : 'open'">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <!-- Cookie Banner -->
    <div *ngIf="!privacyAccepted()" class="cookie-banner">
      <p>
        We gebruiken cookies om je ervaring te verbeteren. 
        <a [routerLink]="['/privacybeleid']">Lees ons privacybeleid</a>
      </p>
      <button mat-raised-button color="primary" (click)="acceptPrivacy()">Akkoord</button>
    </div>
  `,
  styles: [`
    mat-toolbar {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
      position: relative;
      z-index: 5;
    }
    .content {
      padding: 26px;
    }
    mat-sidenav-container {
      height: calc(100vh - 64px);
    }
    mat-sidenav {
      width: 250px; 
      min-width: 65px; 
      max-width: 250px;
      background: white; 
      border-right: 1px solid #ddd;
    }
    /* Cookie banner styles */
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f5;
      padding: 16px;
      text-align: center;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
      z-index: 10000;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    .cookie-banner p {
      margin: 0;
    }
  `],
})
export class AppComponent implements OnInit {
  title = 'Webwizard-Dashboard';
  collapsed = signal(false);
  privacyAccepted = signal(false);

  ngOnInit() {
    this.privacyAccepted.set(this.getCookie('privacyAccepted') === 'true');
  }

  acceptPrivacy() {
    this.setCookie('privacyAccepted', 'true', 365);
    this.privacyAccepted.set(true);
  }

  setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
