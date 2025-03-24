import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AccountService, Account } from '../../services/account.service';
import { EditEmployeeFormComponent } from './edit-employee-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'account',
  imports: [MatButtonModule, MatIcon, MatDialogModule, MatTableModule, 
    EditEmployeeFormComponent,
    MatFormFieldModule,  
    MatInputModule,      
    FormsModule,
    ConfirmDeleteDialogComponent,          
  ],
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

  <div class="table-container"> 
    <table mat-table [dataSource]="filterAccounts()" class="mat-elevation-z8">
      <ng-container matColumnDef="username">
        <th mat-header-cell *matHeaderCellDef> Username </th>
        <td mat-cell *matCellDef="let element">{{ element.username }}</td>
      </ng-container>

      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef> First Name </th>
        <td mat-cell *matCellDef="let element">{{ element.firstName }}</td>
      </ng-container>

      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef> Last Name </th>
        <td mat-cell *matCellDef="let element">{{ element.lastName }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let element">{{ element.email }}</td>
      </ng-container>

      <ng-container matColumnDef="birthDate">
        <th mat-header-cell *matHeaderCellDef> Birth Date </th>
        <td mat-cell *matCellDef="let element">{{ element.birthDate }}</td>
      </ng-container>

      <ng-container matColumnDef="gender">
        <th mat-header-cell *matHeaderCellDef> Gender </th>
        <td mat-cell *matCellDef="let element">{{ element.gender }}</td>
      </ng-container>

      <ng-container matColumnDef="accountType">
        <th mat-header-cell *matHeaderCellDef> Account Type </th>
        <td mat-cell *matCellDef="let element">{{ element.accountType }}</td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button mat-button class="action-button" (click)="OpenAddEditEmployeeForm(element)">
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
    .action-icon-edit {
      color: #1976d2;
    }

    .action-icon-delete {
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
]
})
export class AccountComponent implements OnInit {
accounts: Account[] = [];
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
];

constructor(
  private accountService: AccountService,
  private _dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

ngOnInit(): void {
  this.accounts = this.accountService.addedAccounts;
}

OpenAddEditEmployeeForm(account?: Account) {
  this._dialog.open(EditEmployeeFormComponent, {
    width: '1000px',
    height: '600px',
    data: account || {},
  });
}

filterAccounts() {
  if (this.searchQuery) {
    return this.accounts.filter(account => 
      account.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  return this.accounts;
}

// Open the delete confirmation dialog
openDeleteDialog(account: Account): void {
  const dialogRef = this._dialog.open(ConfirmDeleteDialogComponent, {
    width: '400px',
    data: { name: account.username } // Pass account username for confirmation message
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleteItem(account); // Delete item if confirmed
    } else {
      this.snackBar.open('Verwijdering geannuleerd', 'OK', { duration: 2000 });
    }
  });
}

// Delete the account from the list
deleteItem(account: Account): void {
  const index = this.accounts.findIndex(acc => acc === account);
  if (index > -1) {
    this.accounts.splice(index, 1); // Remove the account from the list
    this.snackBar.open(`${account.username} is verwijderd`, 'OK', { duration: 2000 });
  }
}
}