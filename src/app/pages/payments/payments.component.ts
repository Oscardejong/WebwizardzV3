import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PaymentService, Payment } from '../../services/payment.service';

@Component({
  selector: 'payments',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  template: `
    <div class="header">
      <h2>Payments</h2>
    </div>

    <div class="search-container">
      <mat-form-field appearance="fill" class="search-field">
        <mat-label>Search Payments</mat-label>
        <input matInput [(ngModel)]="searchQuery" placeholder="Search by name, email or payment method">
      </mat-form-field>
    </div>

    <div class="table-container">
      <table mat-table [dataSource]="filterPayments()" class="mat-elevation-z8">

        <ng-container matColumnDef="firstName">
          <th mat-header-cell *matHeaderCellDef> First Name </th>
          <td mat-cell *matCellDef="let payment">{{ payment.firstName }}</td>
        </ng-container>

        <ng-container matColumnDef="lastName">
          <th mat-header-cell *matHeaderCellDef> Last Name </th>
          <td mat-cell *matCellDef="let payment">{{ payment.lastName }}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let payment">{{ payment.email }}</td>
        </ng-container>

        <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef> Amount </th>
        <td mat-cell *matCellDef="let payment">{{ payment.amount | currency:'EUR' }}</td>
      </ng-container>

        <ng-container matColumnDef="paymentMethod">
          <th mat-header-cell *matHeaderCellDef> Payment Method </th>
          <td mat-cell *matCellDef="let payment">{{ payment.paymentMethod }}</td>
        </ng-container>

        <ng-container matColumnDef="paymentDate">
          <th mat-header-cell *matHeaderCellDef> Payment Date </th>
          <td mat-cell *matCellDef="let payment">{{ payment.paymentDate }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let payment">
          <mat-icon 
            class="status-icon" 
            [ngClass]="{
              'completed': payment.status === 'Completed', 
              'pending': payment.status === 'Pending', 
              'failed': payment.status === 'Failed'
            }">
            {{ payment.status === 'Completed' ? 'check_circle' : (payment.status === 'Pending' ? 'hourglass_empty' : 'cancel') }}
          </mat-icon>
          {{ payment.status }}
        </td>
      </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [
    `
    .status-icon {
  font-size: 20px;
  vertical-align: middle;
  margin-right: 5px;
}

.completed {
  color: green;
}

.pending {
  color: orange;
}

.failed {
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
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    `
  ],
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  searchQuery: string = '';
  displayedColumns: string[] = [
    'firstName', 'lastName', 'email', 'amount', 'paymentMethod', 'paymentDate', 'status'
  ];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.payments = this.paymentService.addedPayments;
  }

  filterPayments() {
    if (this.searchQuery) {
      return this.payments.filter(payment =>
        payment.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        payment.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        payment.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        payment.paymentMethod.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.payments;
  }
}
