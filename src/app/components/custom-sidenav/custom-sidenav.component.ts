import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  template: `
    <div class="sidenav-header">
      <img [width]="profilePicSize()" 
           [height]="profilePicSize()"  
            src= "assets/Designer.jpeg"
            />
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Your channel</h2>
        <p>Oscar de Jong</p>
    </div>
    <mat-nav-list>
      <a mat-list-item *ngFor="let item of menuItems()" 
    [routerLink]="item.route"
    routerLinkActive="active-link"
    [routerLinkActiveOptions]="{ exact: true }"
    #rla="routerLinkActive"
    [class.selected-menu-item]="rla.isActive">
    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
    <span matListItemTitle *ngIf="!sideNavCollapsed()">{{ item.label }}</span>
    </a>


       
    </mat-nav-list>

  `,
  styles: `
   /* Active link styles */
   .active-link {
      background-color: #f0f0f0;  /* Achtergrondkleur voor actieve link */
      color: #007bff;  /* Kleur voor de tekst van de link */
    }

    /* Kleur van het icoon wanneer de link actief is */
    .active-link mat-icon {
      color: #007bff;  /* Blauwe kleur voor het icoon */
    }





  :host * {
    transition: all 300ms ease-in-out;

  }
  
  .sidenav-header {
    padding-top: 24px;
    text-align: center;

    > img {
      border-radius: 100%;
      object-fit: cover;
      margin-bottom: 10px;
    }
  
    .header-text {
      height: 3rem;

      > h2 {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
      }
  
      > p {
        margin: 0;
        font-size: 0.8rem;
      }
    }

    .hide-header-text {
      opacity: 0;
      height: 0px !important;
    }


    .selected-menu-item {
      border-left: 5px solid;
      border-left-color: blue; 
    }
      
  }
  



  `
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }
  

  
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',

    },
    {
      icon: 'domain',
      label: 'Domain',
      route: 'domain',

    },

    {
      icon: 'payments',
      label: 'Payments',
      route: 'payments',

    },

    {
      icon: 'person',
      label: 'Account',
      route: 'account',

    },

   {
      icon: 'web',
      label: 'Websites',
      route: 'websites',

    },


  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

}
