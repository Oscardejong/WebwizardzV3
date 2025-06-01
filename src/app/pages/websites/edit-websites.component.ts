import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { trigger, transition, style, animate } from '@angular/animations';
import { WebsiteService } from '../../services/website.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DomainService } from '../../services/domain.service';

@Component({
  selector: 'app-edit-websites',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
  template: `
  <mat-horizontal-stepper [(selectedIndex)]="selectedStep" color="primary" [@stepTransition]="selectedStep">

    <!-- Step 1: Name and Domain -->
    <mat-step [label]="'Basic Info'">
      <div mat-dialog-title>
        <h1>Select domain</h1>
      </div>
      <div mat-dialog-content class="content">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Website Name</mat-label>
          <input matInput [(ngModel)]="website.name" name="name" required>
          <mat-error *ngIf="!website.name">Website name is required.</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Select Domain</mat-label>
          <input type="text"
                 matInput
                 [(ngModel)]="website.domainname"
                 (ngModelChange)="filterDomains($event)"
                 [matAutocomplete]="auto"
                 name="domainname"
                 required>
          <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayDomain">
            <mat-option *ngFor="let domain of filteredDomainNames" [value]="domain">
              {{ domain }}
            </mat-option>
          </mat-autocomplete>
          <mat-error *ngIf="!website.domainname">Domain is required.</mat-error>
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperNext color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Step 2: Type selection -->
    <mat-step [label]="'Type'">
      <div mat-dialog-title>
        <h1>Select type</h1>
      </div>
      <div mat-dialog-content class="content type-selection">
        <div class="type-option"
             [class.selected]="website.websitetype === 'Poster'"
             (click)="selectType('Poster')">
          <mat-icon class="type-icon">photo</mat-icon>
          <span>Poster</span>
        </div>

        <div class="type-option"
             [class.selected]="website.websitetype === 'Ticket'"
             (click)="selectType('Ticket')">
          <mat-icon class="type-icon">confirmation_number</mat-icon>
          <span>Ticket</span>
        </div>
      </div>
      <div mat-dialog-content *ngIf="!website.websitetype" style="padding-left: 20px; padding-top: 10px;">
        <mat-error>Please select a website type.</mat-error>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperPrevious>Back</button>
        <button mat-button matStepperNext color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Step 3: File Upload -->
    <mat-step [label]="'Upload'">
      <div mat-dialog-title>
        <h1>Upload file</h1>
      </div>
      <div mat-dialog-content class="content">
        <input type="file" (change)="handleFileInput($event)">
        <p *ngIf="uploadedFile">Selected file: {{ uploadedFile.name }}</p>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperPrevious>Back</button>
        <button mat-button matStepperNext color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Step 4: Review -->
    <mat-step [label]="'Review'">
      <div mat-dialog-content class="content">
        <p><strong>Name:</strong> {{ website.name }}</p>
        <p><strong>Domain:</strong> {{ website.domainname }}</p>
        <p><strong>Type:</strong> {{ website.websitetype || 'Not selected' }}</p>
        <p><strong>File:</strong> {{ uploadedFile?.name || 'No file uploaded' }}</p>
      </div>
            <div *ngIf="errorMessage" style="color:red; margin-bottom: 12px;">
        {{ errorMessage }}
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperPrevious>Back</button>
        <button mat-raised-button color="primary" (click)="saveWebsite()" [disabled]="!isFormValid()">Save</button>
      </div>

    </mat-step>

  </mat-horizontal-stepper>
  `,
  styles: [`
.full-width {
  width: 75%;
  max-width: 600px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 30px;
  padding-left: 20px;
}

.type-selection {
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding-top: 30px;
  padding-left: 20px;
}

.type-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid transparent;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  width: 150px;
  transition: 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  font-size: 18px;
}

.type-option:hover {
  border-color: #3f51b5;
}

.type-option.selected {
  border-color: #3f51b5;
  background-color: #e8eaf6;
}

.type-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}
  `],
  animations: [
    trigger('stepTransition', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class EditWebsitesComponent {
  selectedStep = 0;
  uploadedFile: File | null = null;
  domainNames: string[] = [];
  filteredDomainNames: string[] = [];
  errorMessage: string = '';

  website: any = {
    name: '',
    domainname: '',
    websitetype: '',
    status: 'Active',
  };

  constructor(
    private dialogRef: MatDialogRef<EditWebsitesComponent>,
    private websiteService: WebsiteService,
    private domainService: DomainService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.domainService.getAllDomains().subscribe(domains => {
      this.domainNames = domains.map(d => d.domainname);
      this.filteredDomainNames = this.domainNames;
    });
  }

  filterDomains(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredDomainNames = this.domainNames.filter(d => d.toLowerCase().includes(filterValue));
  }

  displayDomain(domain: string): string {
    return domain || '';
  }

  selectType(type: 'Poster' | 'Ticket') {
    this.website.websitetype = type;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) this.uploadedFile = file;
  }

  isFormValid(): boolean {
    return !!(this.website.name && this.website.domainname && this.website.websitetype);
  }

  saveWebsite() {
    if (!this.isFormValid()) return;

    this.errorMessage = '';

    const payload = {
      fields: {
        name: this.website.name,
        type: this.website.websitetype,
        status: this.website.status,
        domainname: this.website.domainname,
      },
      file: this.uploadedFile || undefined
    };

    this.websiteService.createWebsite(payload).subscribe({
      next: (createdWebsite) => {
        console.log('Website successfully created:', createdWebsite);
        this.dialogRef.close(createdWebsite);
      },
      error: (error) => {
        console.error('Error creating website:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Er is een onbekende fout opgetreden.';
        }
      }
    });
  }
}
