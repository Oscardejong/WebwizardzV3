import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DomainService, Domain } from '../../services/domain.service';
import { EditDomainFormComponent } from './edit-domain-form.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { UpdateDomainDialogComponent } from './edit-dialog-domain.component';

@Component({
  selector: 'domain',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    EditDomainFormComponent,
    CommonModule,
    UpdateDomainDialogComponent
  ],
  template: `
    <div class="header">
      <h2>Domain Portfolio</h2>
    </div>

    <div class="search-container">
      <mat-form-field appearance="fill" class="search-field">
        <mat-label>Search Domains</mat-label>
        <input matInput [(ngModel)]="searchQuery" placeholder="Search by domain or username" />
      </mat-form-field>
    </div>

    <div class="button-container">
      <button mat-raised-button color="primary" (click)="OpenAddEditDomainForm()">
        <mat-icon>add_circle</mat-icon>
        Add Domain
      </button>
        <button mat-raised-button color="accent" (click)="refreshDomains()" style="margin-left: 10px;">
    <mat-icon>refresh</mat-icon>
    Refresh
  </button>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="filterDomains()" class="mat-elevation-z8">

        <!-- Domain Name Column -->
        <ng-container matColumnDef="domainname">
          <th mat-header-cell *matHeaderCellDef> Domain </th>
          <td mat-cell *matCellDef="let domain">
            <a *ngIf="domain.domainname" [href]="'http://' + domain.domainname" target="_blank" rel="noopener" class="url-link">
              {{ domain.domainname }}
            </a>
            <span *ngIf="!domain.domainname">No URL available</span>
          </td>
        </ng-container>

        <!-- Username Column -->
        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef> Username </th>
          <td mat-cell *matCellDef="let domain">{{ domain.username }}</td>
        </ng-container>

        <!-- Starting Date Column -->
        <ng-container matColumnDef="startdatetime">
          <th mat-header-cell *matHeaderCellDef> Starting Date </th>
          <td mat-cell *matCellDef="let domain">{{ domain.startdatetime | date:'short' }}</td>
        </ng-container>

        <!-- Expiration Date Column -->
        <ng-container matColumnDef="enddatetime">
          <th mat-header-cell *matHeaderCellDef> Expiration Date </th>
          <td mat-cell *matCellDef="let domain">{{ domain.enddatetime | date:'short' }}</td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="domainstatus">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let domain">
            <mat-icon
              class="status-icon"
              [ngClass]="{
                'active': domain.domainstatus === 'ONLINE',
                'inactive': domain.domainstatus === 'OFFLINE'
              }"
              >circle</mat-icon
            >
            {{ domain.domainstatus }}
          </td>
        </ng-container>

        <!-- Action Buttons -->
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <button mat-button class="action-button" (click)="openUpdateDomainDialog(element)">
              <mat-icon class="action-icon-edit">edit</mat-icon>
            </button>
            <button mat-button class="action-button" (click)="openDeleteDialog(element)">
              <mat-icon class="action-icon-delete">delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <!-- Header and Row Definitions -->
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
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
  ]
})
export class DomainComponent implements OnInit {
  domains: Domain[] = [];
  searchQuery: string = '';
  displayedColumns: string[] = ['domainname', 'username', 'startdatetime', 'enddatetime', 'domainstatus', 'action'];

  constructor(private domainService: DomainService, private _dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.domainService.getAllDomains().subscribe({
      next: (domains) => {
        this.domains = domains;
      },
      error: (error) => {
        console.error('Error loading domains:', error);
      }
    });
  }
  refreshDomains() {
  this.domainService.getAllDomains().subscribe({
    next: (domains) => {
      this.domains = domains;
      this.snackBar.open('Domain list refreshed', 'OK', { duration: 2000 });
    },
    error: (error) => {
      console.error('Error refreshing domains:', error);
      this.snackBar.open('Failed to refresh domains', 'OK', { duration: 3000 });
    }
  });
}


 OpenAddEditDomainForm(domain?: Domain): void {
  const dialogRef = this._dialog.open(EditDomainFormComponent, {
    width: '1000px',
    height: '600px',
    data: {
      mode: domain ? 'edit' : 'create',
      domain: domain,
      domainname: domain?.domainname
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Result bevat domeingegevens, dus herlaad de lijst
      this.refreshDomains();  
    }
  });
}


  filterDomains() {
    if (this.searchQuery) {
      return this.domains.filter(
        (domain) =>
          domain.domainname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          domain.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.domains;
  }

openUpdateDomainDialog(domain: Domain) {
  const dialogRef = this._dialog.open(UpdateDomainDialogComponent, {
    width: '400px',
    data: {
      start: this.toDatetimeLocalString(domain.startdatetime),
      end: this.toDatetimeLocalString(domain.enddatetime)
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const updated: Domain = {
        ...domain,
        startdatetime: result.start,
        enddatetime: result.end
      };

      this.domainService.updateDomain(domain.domainname, updated).subscribe({
        next: () => {
          this.snackBar.open('Domein-periode bijgewerkt', 'OK', { duration: 2000 });
          this.refreshDomains();
        },
        error: () => {
          this.snackBar.open('Bijwerken mislukt', 'OK', { duration: 3000 });
        }
      });
    }
  });
}






  openDeleteDialog(element: Domain): void {
    const dialogRef = this._dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { name: element.domainname }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(element);
      } else {
        this.snackBar.open('Verwijdering geannuleerd', 'OK', { duration: 2000 });
      }
    });
  }

  

  deleteItem(domain: Domain): void {
    this.domainService.deleteDomain(domain.domainname).subscribe({
      next: () => {
        this.domains = this.domains.filter((d) => d.domainname !== domain.domainname);
        this.snackBar.open(`${domain.domainname} has been deleted`, 'OK', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error deleting domain:', error);
        this.snackBar.open(`Failed to delete ${domain.domainname}`, 'OK', { duration: 3000 });
      }
    });
  }

  private toDatetimeLocalString(date: string | Date): string {
  const d = new Date(date);
  // corrigeer tijdzone-offset zodat lokale tijd klopt
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);          // "YYYY-MM-DDTHH:MM"
}

}
