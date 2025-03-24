import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { _MatInternalFormField, MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { MatCheckboxModule } from '@angular/material/checkbox';





@Component({
  selector: 'app-edit-domain-form',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatRadioModule, MatIcon, MatStepperModule, MatTooltipModule, MatAutocompleteModule
  , CommonModule, ScrollingModule,
   FormsModule, MatCheckboxModule],
  template: `
     <mat-horizontal-stepper [(selectedIndex)]="selectedStep"
  color="primary">
    <!-- Eerste stap -->
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
        <button mat-button matStepperNext
        color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Tweede stap -->
    <mat-step [label]="'Choose domain'">
      <div mat-dialog-title>
        <h1>Choose domain</h1>
      </div>
        <!-- Domeinnaam invoerveld -->
  <mat-form-field appearance="fill" class="full-width" style="width: 750px;">
    <mat-label>Enter domain name</mat-label>
    <input type="text" matInput [(ngModel)]="domainName" placeholder="example">
    <mat-error *ngIf="!domainName">Domain name is required.</mat-error>
  </mat-form-field>


  <div class="domain-extensions">
    <button mat-button (click)="addExtension('.com')">.com</button>
    <button mat-button (click)="addExtension('.org')">.org</button>
    <button mat-button (click)="addExtension('.nl')">.nl</button>
  </div>


  <div class="actions">
    <button mat-button (click)="generateDomainName()" color="primary">Generate Name</button>
  </div>


  <mat-form-field appearance="fill" class="full-width" style="width: 750px;">
    <mat-label>Full domain name</mat-label>
    <input type="text" matInput [value]="fullDomainName" readonly>
  </mat-form-field>


   
      <div mat-dialog-actions class="actions" >
  <button mat-button matStepperPrevious>Back</button>
  <button mat-button matStepperNext color="primary">Next</button>
</div>

    <!-- Derde stap -->
    </mat-step>
    <mat-step [label]="'Choose domain period'">
      <div mat-dialog-title>
        <h1>Domain Registration Period</h1>
      </div>

      <!-- Begindatum en begintijd naast elkaar -->
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
        <!-- Einddatum en eindtijd naast elkaar -->
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

    <!-- Vierde stap -->
    <mat-step [label]="'Choose settings'">
      <div mat-dialog-title>
        <h1>Choose your settings</h1>
      </div>
      <form>

    <!-- SSL Certificaat -->
    <mat-checkbox [(ngModel)]="sslCertificate" name="sslCertificate">Enable SSL certificate (HTTPS)</mat-checkbox>
    <p>Enabling an SSL certificate is crucial for securing data and ensuring a secure "HTTPS" connection. It is important for customers who run an e-commerce website or handle sensitive information.</p>

    <!-- Domein Lock -->
    <mat-checkbox [(ngModel)]="domainLock" name="domainLock">Enable domain lock</mat-checkbox>
    <p>Domain lock ensures that the domain cannot be transferred accidentally or without authorization. This adds an extra layer of security to your domain.</p>

    <!-- Domain Privacy Protection -->
    <mat-checkbox [(ngModel)]="domainPrivacy" name="domainPrivacy">Enable domain privacy protection</mat-checkbox>
    <p>Domain privacy protection safeguards the personal information of the domain owner (such as name, address, and phone number) from public WHOIS databases. This is important for privacy and reduces unwanted spam.</p>

      <div mat-dialog-actions class="actions">
      <button mat-button matStepperPrevious>Back</button>
      <button mat-button matStepperNext color="primary">Next</button>
    </div>
      </form>
    </mat-step>


        <!-- Vijfde stap -->
    <mat-step [label]="'Finish'">
      <div mat-dialog-title>
        <h1>Finish</h1>
      </div>
      <div mat-dialog-content class="content">
        <p>Review your information before saving.</p>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperPrevious>Back</button>
        <button mat-raised-button color="primary"[disabled]="!isFormValid()">Save</button>
      </div>
    </mat-step>
  </mat-horizontal-stepper>
  `,
  styles: `

  
  .actions {
    display: flex;
    justify-content: flex-end; /* Zorgt ervoor dat de knoppen rechts staan */
    gap: 10px;
    width: 100%;
    margin-top: auto; /* Dit zorgt ervoor dat de knoppen altijd onderaan staan */
  }
  
  .row{
        display: flex;
        gap: 15px;
  }
  
  .close-form{
        position: absolute;
        top: 0px;
        right: 0px;
  }`

})
export class EditDomainFormComponent {
  selectedStep: number = 0;
  userList: string[] = []; 
  selectedUsername: string | null = null;

  // Domeinnaam model
  domainName: string = '';
  domainExtension: string = '.com'; // Standaard extensie
  fullDomainName: string = ''; // Gecombineerde domeinnaam


 // Data en tijd voor de derde stap
  startDate: Date | null = null;
  startTime: string = '';  // Format: HH:mm
  endDate: Date | null = null;
  endTime: string = '';  // Format: HH:mm
  
  isFormValid(): boolean {
    return this.selectedUsername !== null && 
           this.domainName !== '' &&
           this.startDate !== null &&
           this.startTime !== '' &&
           this.endDate !== null &&
           this.endTime !== '';
  }



  constructor(private accountService: AccountService) { }

  sslCertificate: boolean = false;
  domainLock: boolean = false;
  domainPrivacy: boolean = false;

  ngOnInit() {
    // Account service inladen zoals je eerder hebt gedaan
    this.userList = this.accountService.addedAccounts.map(account => account.username);
  }

  // Functie om extensie toe te voegen
  addExtension(extension: string): void {
    this.domainExtension = extension;
    this.updateFullDomainName();
  }

  // Functie om een automatische naam te genereren
  generateDomainName(): void {
    const randomName = 'domain' + Math.floor(Math.random() * 1000);
    this.domainName = randomName;
    this.updateFullDomainName();
  }

  // Combineer domeinnaam en extensie
  updateFullDomainName(): void {
    this.fullDomainName = this.domainName + this.domainExtension;
  }

  // Logica voor autocomplete gebruikersnamen
  filteredUsers(): string[] {
    return this.userList.filter(user =>
      user.toLowerCase().includes((this.selectedUsername || '').toLowerCase())
    );
  }

  displayUsername(user: string): string {
    return user || '';
  }
}
