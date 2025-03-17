import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AccountService, Account } from '../../services/account.service'; // Importeer de Account interface en service
import { EditEmployeeFormComponent } from './edit-employee-form.component';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importeren van MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importeren van MatInputModule
import { FormsModule } from '@angular/forms'; // Importeren van FormsModule voor ngModel


@Component({
  selector: 'account',
  imports: [MatButtonModule, MatIcon, MatDialogModule, MatTableModule, 
    EditEmployeeFormComponent,
    MatFormFieldModule,  
    MatInputModule,      
    FormsModule          
  
  
  ], // Importeer de benodigde modules
  template: `
    <div class="header">
      <h2>Accounts</h2>
    </div>

    <div class="search-container">
      <mat-form-field appearance="fill" class="search-field">
        <mat-label>Search Accounts</mat-label>
        <input matInput [(ngModel)]="searchQuery" placeholder="Search by username, email, etc.">
      </mat-form-field>
    </div>
        <div class="button-container">
    <button mat-raised-button class="add-widget-button" color="primary" (click)="OpenAddEditEmployeeForm()">
        <mat-icon>add_circle</mat-icon>
        Add account
      </button>
    </div> 

    <!-- Tabel om de accounts weer te geven -->
    <div class="table-container"> 
    <table mat-table [dataSource]="filterAccounts()" class="mat-elevation-z8">
    <ng-container matColumnDef="username">
        <th mat-header-cell *matHeaderCellDef> Username </th>
        <td mat-cell *matCellDef="let account">{{ account.username }}</td>
      </ng-container>

      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef> First Name </th>
        <td mat-cell *matCellDef="let account">{{ account.firstName }}</td>
      </ng-container>

      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef> Last Name </th>
        <td mat-cell *matCellDef="let account">{{ account.lastName }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let account">{{ account.email }}</td>
      </ng-container>

      <ng-container matColumnDef="birthDate">
        <th mat-header-cell *matHeaderCellDef> Birth Date </th>
        <td mat-cell *matCellDef="let account">{{ account.birthDate }}</td>
      </ng-container>

      <ng-container matColumnDef="gender">
        <th mat-header-cell *matHeaderCellDef> Gender </th>
        <td mat-cell *matCellDef="let account">{{ account.gender }}</td>
      </ng-container>

      <ng-container matColumnDef="accountType">
        <th mat-header-cell *matHeaderCellDef> Account Type </th>
        <td mat-cell *matCellDef="let account">{{ account.accountType }}</td>
      </ng-container>

      <ng-container matColumnDef="action">
      <th mat-header-cell *matHeaderCellDef>Acties</th>
      <td mat-cell *matCellDef="let element">
      <mat-icon class="action-icon-edit" >edit</mat-icon>
        <mat-icon class="action-icon-delete">delete</mat-icon>
        </td>
       </ng-container>


      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    </div>
  `,
  styles: [
    `

      .action-icon-edit{
              color: #1976d2;
            }

            .action-icon-delete{
              color: red;
            }

     .search-container {
        width: 1000px; 
        margin-top: 40px;
        margin-bottom: 20px;
      }
      .search-field {
        width: 100%; /* Zorg ervoor dat de zoekbalk de volledige breedte van de container inneemt */
      }
      .table-container {
        margin-top: 40px; /* Voeg wat ruimte toe boven de tabel */
      }
      .add-widget-button{
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

    `,
  ],
})
export class AccountComponent implements OnInit {
  accounts: Account[] = []; // Array van accounts
  searchQuery: string = '';
  displayedColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'gender',
    'accountType',
    'action'
  ]; // De kolommen die we willen weergeven

  constructor(
    private accountService: AccountService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Haal de accounts op uit de service wanneer de component geladen wordt
    this.accounts = this.accountService.addedAccounts;
  }

  OpenAddEditEmployeeForm() {
    this._dialog.open(EditEmployeeFormComponent, {
      width: '500px',
      height: '600px',
    });
  }

    // Voeg een filterfunctie toe
    filterAccounts() {
      if (this.searchQuery) {
        return this.accounts.filter(account => 
          account.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          account.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.accounts;
    }
}
