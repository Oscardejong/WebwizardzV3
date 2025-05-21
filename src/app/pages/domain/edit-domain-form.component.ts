import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AccountService } from '../../services/account.service';
import { DomainService } from '../../services/domain.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-domain-form',
  imports: [
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatIcon,
    MatStepperModule, MatTooltipModule, MatAutocompleteModule,
    CommonModule, ScrollingModule, FormsModule, MatCheckboxModule
  ],
  template: `
    <mat-horizontal-stepper [(selectedIndex)]="selectedStep" color="primary">

      <!-- Stap 1 -->
      <mat-step [label]="'Choose account'">
        <div mat-dialog-title>
          <h1>Choose Account</h1>
        </div>
        <mat-form-field appearance="fill" class="full-width" style="width: 750px;">
          <mat-label>Search or select a username</mat-label>
          <input type="text" matInput [(ngModel)]="selectedUsername" [matAutocomplete]="auto">
          <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayUsername">
            <mat-option *ngFor="let user of filteredUsers()" [value]="user">
              {{ user }}
            </mat-option>
          </mat-autocomplete>
          <mat-error *ngIf="!selectedUsername">Username is required.</mat-error>
        </mat-form-field>
        <div mat-dialog-actions class="actions">
          <button mat-button matStepperNext color="primary">Next</button>
        </div>
      </mat-step>

      <!-- Stap 2 -->
      <mat-step [label]="'Choose domain'">
        <div mat-dialog-title>
          <h1>Choose domain</h1>
        </div>
        <mat-form-field appearance="fill" class="full-width" style="width: 750px;">
          <mat-label>Enter subdomain name</mat-label>
          <input type="text" matInput [(ngModel)]="domainName" (ngModelChange)="updateFullDomainName()" placeholder="example">
          <mat-error *ngIf="!domainName">Subdomain name is required.</mat-error>
        </mat-form-field>

        <div class="actions">
          <button mat-button (click)="generateDomainName()" color="primary">Generate Name</button>
        </div>

        <mat-form-field appearance="fill" class="full-width" style="width: 750px;">
          <mat-label>Full domain name</mat-label>
          <input type="text" matInput [value]="fullDomainName" readonly>
        </mat-form-field>

        <div mat-dialog-actions class="actions">
          <button mat-button matStepperPrevious>Back</button>
          <button mat-button matStepperNext color="primary">Next</button>
        </div>
      </mat-step>

      <!-- Stap 3 -->
      <mat-step [label]="'Choose domain period'">
        <div mat-dialog-title>
          <h1>Domain Registration Period</h1>
        </div>
        <div class="date-time-fields">
          <mat-form-field appearance="fill" style="width: 370px;">
            <mat-label>Start Date</mat-label>
            <input matInput [matDatepicker]="startDatePicker" [(ngModel)]="startDate" placeholder="Choose start date">
            <mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #startDatePicker></mat-datepicker>
            <mat-error *ngIf="!startDate">Start date is required.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 370px;">
            <mat-label>Start Time</mat-label>
            <input matInput [(ngModel)]="startTime" placeholder="HH:mm" type="time">
            <mat-error *ngIf="!startTime">Start time is required.</mat-error>
          </mat-form-field>
        </div>

        <div class="date-time-fields">
          <mat-form-field appearance="fill" style="width: 370px;">
            <mat-label>End Date</mat-label>
            <input matInput [matDatepicker]="endDatePicker" [(ngModel)]="endDate" placeholder="Choose end date">
            <mat-datepicker-toggle matSuffix [for]="endDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #endDatePicker></mat-datepicker>
            <mat-error *ngIf="!endDate">End date is required.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 370px;">
            <mat-label>End Time</mat-label>
            <input matInput [(ngModel)]="endTime" placeholder="HH:mm" type="time">
            <mat-error *ngIf="!endTime">End time is required.</mat-error>
          </mat-form-field>
        </div>

        <div mat-dialog-actions class="actions">
          <button mat-button matStepperPrevious>Back</button>
          <button mat-button matStepperNext color="primary">Next</button>
        </div>
      </mat-step>

     <!-- Stap 4 -->
<mat-step [label]="'Review & Save'">
  <div mat-dialog-title>
    <h1>Review Information</h1>
  </div>
  <div mat-dialog-content class="content">
    <h3>Account</h3>
    <p><strong>Username:</strong> {{ selectedUsername }}</p>

    <h3>Domain</h3>
    <p><strong>Subdomain:</strong> {{ domainName }}</p>
    <p><strong>Full Domain:</strong> {{ fullDomainName }}</p>

    <h3>Registration Period</h3>
    <p><strong>Start:</strong> {{ startDate | date: 'mediumDate' }} {{ startTime }}</p>
    <p><strong>End:</strong> {{ endDate | date: 'mediumDate' }} {{ endTime }}</p>
  </div>
  <div mat-dialog-actions class="actions">
    <button mat-button matStepperPrevious>Back</button>
    <button mat-raised-button color="primary" [disabled]="!isFormValid()" (click)="saveDomain()">Save</button>
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
    .date-time-fields {
      display: flex;
      gap: 15px;
      margin-bottom: 10px;
    }
  `
})
export class EditDomainFormComponent {
  selectedStep: number = 0;
  userList: string[] = [];
  selectedUsername: string | null = null;

  domainName: string = '';
  fullDomainName: string = '';

  startDate: Date | null = null;
  startTime: string = '';
  endDate: Date | null = null;
  endTime: string = '';

  sslCertificate: boolean = false;
  domainLock: boolean = false;
  domainPrivacy: boolean = false;

  constructor(
    private accountService: AccountService,
    private domainService: DomainService,
    private dialogRef: MatDialogRef<EditDomainFormComponent>  // MatDialogRef toevoegen
  ) {}

  ngOnInit() {
    this.userList = this.accountService.addedAccounts.map(account => account.username);
  }

  isFormValid(): boolean {
    return this.selectedUsername !== null &&
           this.domainName !== '' &&
           this.startDate !== null &&
           this.startTime !== '' &&
           this.endDate !== null &&
           this.endTime !== '';
  }

  generateDomainName(): void {
    const randomName = 'domain' + Math.floor(Math.random() * 1000);
    this.domainName = randomName;
    this.updateFullDomainName();
  }

  updateFullDomainName(): void {
    this.fullDomainName = `${this.domainName}.webwizardz.nl`;
  }

  filteredUsers(): string[] {
    return this.userList.filter(user =>
      user.toLowerCase().includes((this.selectedUsername || '').toLowerCase())
    );
  }

  displayUsername(user: string): string {
    return user || '';
  }

  saveDomain(): void {
    if (!this.isFormValid()) {
      return; // Als het formulier niet geldig is, stoppen we hier
    }

   const fullDomainName = `${this.domainName}.webwizardz.com`;

  const domainData = {
    domainname: fullDomainName.trim(), // De volledige domeinnaam
    domainstatus: 'ONLINE',
    startdatetime: this.startDate ? this.formatDate(this.startDate, this.startTime) : '',
    enddatetime: this.endDate ? this.formatDate(this.endDate, this.endTime) : '',
    username: this.selectedUsername || '',
     
  };

    // Roep de createDomain methode van de DomainService aan
    this.domainService.createDomain(domainData).subscribe({
      next: (response) => {
        console.log('Domain saved:', response);  // Log succes in de console
        this.dialogRef.close();  // Sluit de dialoog na succesvolle opslag
      },
      error: (error) => {
        console.error('Error saving domain:', error);  // Log eventuele fouten
        // Je kunt hier eventueel een gebruikersvriendelijke foutmelding tonen.
      }
    });
  }


 formatDate(date: Date, time: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime()) || !time) return ''; // Ongeldige invoer

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  // Verwacht tijdformaat is "HH:mm"
  return `${year}-${month}-${day}T${time}`;
}

  
}
