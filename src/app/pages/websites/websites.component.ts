import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Website, WebsiteService } from '../../services/website.service';
import { EditWebsitesComponent } from './edit-websites.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-websites',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIcon,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="header">
      <h2>Websites</h2>
    </div>

    <div class="search-container">
      <mat-form-field appearance="fill" class="search-field">
        <mat-label>Search Websites</mat-label>
        <input matInput [(ngModel)]="searchQuery" placeholder="Search by name or url">
      </mat-form-field>
    </div>

    <div class="button-container">
      <button mat-raised-button class="add-widget-button" color="primary" (click)="OpeneditWebsitesForm()">
        <mat-icon>add_circle</mat-icon>
        Add Website
      </button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="filterWebsites()" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let website"> {{ website.name }} </td>
        </ng-container>

        <ng-container matColumnDef="domain">
          <th mat-header-cell *matHeaderCellDef> Domain </th>
          <td mat-cell *matCellDef="let website">
            <a *ngIf="website.domain" [href]="website.domain" target="_blank" rel="noopener" class="url-link">
              {{ website.domain }}
            </a>
            <span *ngIf="!website.domain">No URL available</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="website">
          <th mat-header-cell *matHeaderCellDef> Website </th>
          <td mat-cell *matCellDef="let website"> {{ website.websitetype }} </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let website">
            <mat-icon class="status-icon" [ngClass]="{'active': website.status === 'active', 'inactive': website.status === 'inactive'}">
              circle
            </mat-icon>
            {{ website.status }}
          </td>
        </ng-container>

        <ng-container matColumnDef="visits">
          <th mat-header-cell *matHeaderCellDef> Visits </th>
          <td mat-cell *matCellDef="let website"> {{ website.visits }} </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let website">
            <button mat-button class="action-button" (click)="openDeleteDialog(website)">
              <mat-icon class="action-icon-delete">delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .action-icon-edit {
      color: #1976d2;
    }

    .url-link {
      color: #1976d2;
      text-decoration: underline;
      cursor: pointer;
    }

    .action-icon-delete {
      color: red;
    }

    .status-icon {
      font-size: 16px;
      vertical-align: middle;
      margin-right: 5px;
    }

    .active {
      color: green;
    }

    .inactive {
      color: red;
    }

    .search-container {
      width: 1000px;
      margin-top: 40px;
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
    }

    .table-container {
      margin-top: 40px;
    }

    .add-widget-button {
      margin-left: 20px;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-bottom: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  `]
})
export class WebsitesComponent implements OnInit {
  searchQuery: string = '';
  websites: Website[] = [];
  displayedColumns: string[] = ['name', 'domain', 'website', 'status', 'visits', 'action'];

  constructor(private websiteService: WebsiteService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.websites = this.websiteService.addedWebsites;
  }

  OpeneditWebsitesForm() {
    this.dialog.open(EditWebsitesComponent, {
      width: '1000px',
      height: '600px',
    });
  }

  openDeleteDialog(website: Website): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { name: website.name } // Pass the website name to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWebsite(website);
      } else {
        this.snackBar.open('Deletion canceled', 'OK', { duration: 2000 });
      }
    });
  }

  deleteWebsite(website: Website): void {
    const index = this.websites.findIndex(w => w === website);
    if (index > -1) {
      this.websites.splice(index, 1);
      this.snackBar.open(`${website.name} has been deleted`, 'OK', { duration: 2000 });
    }
  }

  filterWebsites(): Website[] {
    if (this.searchQuery) {
      return this.websites.filter(site =>
        site.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        site.domainname.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.websites;
  }
}
