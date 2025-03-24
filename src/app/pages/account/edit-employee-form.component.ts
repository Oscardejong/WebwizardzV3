import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee-form',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatRadioModule, MatIcon, MatStepperModule, MatTooltipModule, FormsModule
  ],
  template: `
  <mat-horizontal-stepper [(selectedIndex)]="selectedStep" color="primary">
    
    <!-- Eerste stap: Personal Information -->
    <mat-step [label]="'Personal Information'">
      <div mat-dialog-title>
        <h1>Personal</h1>
      </div>
      <div mat-dialog-content class="content">
        <div class="row">
          <mat-form-field appearance="fill">
            <mat-label>First name</mat-label>
            <input matInput type="text" placeholder="First name" [(ngModel)]="account.firstName" name="firstName" required>
            <mat-error *ngIf="!account.firstName">First name is required.</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Last name</mat-label>
            <input matInput type="text" placeholder="Last name" [(ngModel)]="account.lastName" name="lastName" required>
            <mat-error *ngIf="!account.lastName">Last name is required.</mat-error>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="fill">
            <mat-label>E-mail</mat-label>
            <input matInput type="email" placeholder="E-mail" [(ngModel)]="account.email" name="email" required>
            <mat-error *ngIf="!account.email">Email is required.</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Date of birth</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="account.birthDate" name="birthDate" required>
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="!account.birthDate">Birth date is required.</mat-error>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-radio-group aria-label="Select gender" [(ngModel)]="account.gender" name="gender" required>
            <mat-radio-button value="male">Male</mat-radio-button>
            <mat-radio-button value="female">Female</mat-radio-button>
          </mat-radio-group>
          <mat-error *ngIf="!account.gender">Gender is required.</mat-error>
        </div>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperNext color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Tweede stap: Account Settings -->
    <mat-step [label]="'Account Settings'">
  <div mat-dialog-title>
    <h1>Account</h1>
  </div>
  <div mat-dialog-content class="content">
    <div class="row">
      <mat-form-field>
        <mat-label>Type</mat-label>
        <select matNativeControl required [(ngModel)]="account.accountType" name="accountType">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <mat-error *ngIf="!account.accountType">Account type is required.</mat-error>
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput type="text" placeholder="Username" [(ngModel)]="account.username" name="username" required>
        <mat-error *ngIf="!account.username">Username is required.</mat-error>
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput type="password" placeholder="Password" [(ngModel)]="account.password" name="password" required>
        <mat-error *ngIf="!account.password">Password is required.</mat-error>
      </mat-form-field>

      <button mat-raised-button 
              matTooltip="Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
              color="primary">
        <mat-icon>info</mat-icon>
      </button>
    </div>

    <div class="row">
      <mat-form-field appearance="fill">
        <mat-label>Repeat password</mat-label>
        <input matInput type="password" placeholder="Repeat password" [(ngModel)]="account.repeatPassword" name="repeatPassword" required>
        <mat-error *ngIf="!account.repeatPassword">Repeat password is required.</mat-error>
      </mat-form-field>
    </div>
  </div>
  <div mat-dialog-actions class="actions">
    <button mat-button matStepperPrevious>Back</button>
    <button mat-button matStepperNext color="primary">Next</button>
  </div>
</mat-step>

    <!-- Derde stap: Finish -->
    <mat-step [label]="'Finish'">
      <div mat-dialog-title>
        <h1>Finish</h1>
      </div>
      <div mat-dialog-content class="content">
        <p>Review your information before saving.</p>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperPrevious>Back</button>
        <button mat-raised-button color="primary" [disabled]="!isFormValid()">Save</button>
      </div>
    </mat-step>

  </mat-horizontal-stepper>
  `,
  styles: `
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      width: 100%;
      margin-top: auto;
    }

    .row {
      display: flex;
      gap: 15px;
    }

    .close-form {
      position: absolute;
      top: 0px;
      right: 0px;
    }
  `
})
export class EditEmployeeFormComponent {
  selectedStep: number = 0;
  account: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.account = data ? { ...data } : this.createEmptyAccount();
  }

  createEmptyAccount() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      gender: '',
      accountType: '',
      password: '',
      repeatPassword: ''
    };
  }

  isFormValid(): boolean {
    return this.account.firstName && this.account.lastName && this.account.email &&
           this.account.accountType && this.account.username && this.account.password &&
           this.account.repeatPassword && this.account.birthDate && this.account.gender;
  }
}
