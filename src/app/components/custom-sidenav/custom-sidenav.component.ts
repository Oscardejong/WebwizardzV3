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
      <img 
        [width]="profilePicSize()" 
        [height]="profilePicSize()"  
        src="assets/Designer.jpeg"
        alt="Profile Picture"
        class="profile-pic"
        (click)="openModal()"
      />
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Your channel</h2>
        <p>Oscar de Jong</p>
      </div>

      <!-- Modal voor grote afbeelding -->
      <div *ngIf="isModalOpen()" class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeModal()">×</button>
          <img src="assets/Designer.jpeg" alt="Profile Large" />
        </div>
      </div>

    </div>

    <mat-nav-list>
      <a mat-list-item *ngFor="let item of menuItems()" 
        [routerLink]="item.route"
        routerLinkActive="active-link"
        [routerLinkActiveOptions]="{ exact: true }"
        #rla="routerLinkActive"
        [class.selected-menu-item]="rla.isActive"
      >
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

    /* Nieuwe styles voor modal */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      position: relative;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      max-width: 90vw;
      max-height: 90vh;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .modal-content img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 8px;
      display: block;
    }
    .close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: transparent;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      line-height: 1;
    }
    .profile-pic {
      cursor: pointer;
      border-radius: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .profile-pic:hover {
      transform: scale(1.05);
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

  // --- Toevoegingen voor modal afbeelding ---
  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
