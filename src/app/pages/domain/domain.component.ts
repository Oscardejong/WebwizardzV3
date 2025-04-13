import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DomainService, Domain } from '../../services/domain.service';
import { EditDomainFormComponent } from './edit-domain-form.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'domain',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    EditDomainFormComponent,
    CommonModule
  ],

  template: `
    <div class="header">
      <h2>Domain Portfolio</h2>
    </div>

    <div class="search-container">
      <mat-form-field appearance="fill" class="search-field">
        <mat-label>Search Domains</mat-label>
        <input matInput [(ngModel)]="searchQuery" placeholder="Search by domain or username">
      </mat-form-field>
    </div>
    <div class="button-container">
      <button mat-raised-button class="add-widget-button" color="primary" (click)="OpenAddEditDomainForm()">
        <mat-icon>add_circle</mat-icon>
        Add Domain
      </button>
    </div>
    <div class="table-container">
      <table mat-table [dataSource]="filterDomains()" class="mat-elevation-z8">

      <ng-container matColumnDef="domainName">
  <th mat-header-cell *matHeaderCellDef> Domain </th>
  <td mat-cell *matCellDef="let domain">
    <a *ngIf="domain.domainName" [href]="domain.domainName" target="_blank" rel="noopener" class="url-link">
      {{ domain.domainName }}
    </a>
    <span *ngIf="!domain.domainName">No URL available</span>
  </td>
</ng-container>

        <ng-container matColumnDef="userName">
          <th mat-header-cell *matHeaderCellDef> Username </th>
          <td mat-cell *matCellDef="let domain">{{ domain.userName }}</td>
        </ng-container>

        <ng-container matColumnDef="startDate">
          <th mat-header-cell *matHeaderCellDef> Starting Date </th>
          <td mat-cell *matCellDef="let domain">{{ domain.startingDate }}</td>
        </ng-container>

        <ng-container matColumnDef="expirationDate">
          <th mat-header-cell *matHeaderCellDef> Expiration Date </th>
          <td mat-cell *matCellDef="let domain">{{ domain.expirationDate }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let domain">
            <mat-icon class="status-icon" [ngClass]="{'active': domain.status === 'active', 'inactive': domain.status === 'inactive'}">
              circle
            </mat-icon>
            {{ domain.status }}
          </td>
        </ng-container>
        
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <button mat-button class="action-button" (click)="OpenAddEditDomainForm()">
              <mat-icon class="action-icon-edit">edit</mat-icon>
            </button>
            <button mat-button class="action-button" (click)="openDeleteDialog(element)">
              <mat-icon class="action-icon-delete">delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [
    `
    .url-link {
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
}
      .action-icon-edit {
        color: #1976d2;
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
    `
  ],
})
export class DomainComponent implements OnInit {
  domains: Domain[] = [];
  searchQuery: string = '';
  displayedColumns: string[] = ['domainName', 'userName', 'startDate', 'expirationDate', 'status', 'action'];

  constructor(private domainService: DomainService, private _dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.domains = this.domainService.addedDomains;
  }

  OpenAddEditDomainForm() {
    this._dialog.open(EditDomainFormComponent, {
      width: '1000px',
      height: '600px',
    });
  }

  filterDomains() {
    if (this.searchQuery) {
      return this.domains.filter(domain =>
        domain.domainName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        domain.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.domains;
  }

  openDeleteDialog(element: Domain): void {
    const dialogRef = this._dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { name: element.domainName } // Pass here the domain name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(element);
      } else {
        this.snackBar.open('Verwijdering geannuleerd', 'OK', { duration: 2000 });
      }
    });
  }

  deleteItem(domain: Domain): void {
    const index = this.domains.findIndex(d => d === domain);
    if (index > -1) {
      this.domains.splice(index, 1);  // Remove the domain from the list
      this.snackBar.open(`${domain.domainName} is verwijderd`, 'OK', { duration: 2000 });
    }
  }
}
