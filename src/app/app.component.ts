import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { trigger, state, style, transition, animate } from '@angular/animations';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, 
    MatButtonModule, MatIconModule, MatSidenavModule, 
    CustomSidenavComponent],
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

  mat-sidenav-container{
    height: calc(100vh - 64px);
  }

  mat-sidenav {
  width: 250px; 
  min-width: 65px; 
  max-width: 250px;
  background: white; 
  border-right: 1px solid #ddd; 
}


  
  
  `],
})
export class AppComponent {

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');


}
