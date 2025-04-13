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
import { WebsiteService, Website } from '../../services/website.service';

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
    MatCheckboxModule
  ],
  template: `
  <mat-horizontal-stepper [(selectedIndex)]="selectedStep" color="primary" [@stepTransition]="selectedStep">
    
    <!-- Step 1: Name and Domain -->
    <mat-step [label]="'Basic Info'">
      <div mat-dialog-content class="content">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Website Name</mat-label>
          <input matInput [(ngModel)]="website.name" placeholder="e.g. Ticket Wizard" name="name">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Select Domain</mat-label>
          <mat-select [(ngModel)]="website.domain" name="domain">
            <mat-option *ngFor="let site of domains" [value]="site.domain">{{ site.domain }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperNext color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Step 2: Type selection -->
    <mat-step [label]="'Type'">
      <div mat-dialog-content class="content type-selection">
        <div class="type-option" 
             [class.selected]="website.websitetype === 'poster'" 
             (click)="selectType('poster')">
          <mat-icon class="type-icon">photo</mat-icon>
          <span>Poster</span>
        </div>

        <div class="type-option" 
             [class.selected]="website.websitetype === 'ticket'" 
             (click)="selectType('ticket')">
          <mat-icon class="type-icon">confirmation_number</mat-icon>
          <span>Ticket</span>
        </div>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperPrevious>Back</button>
        <button mat-button matStepperNext color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Step 3: File Upload -->
    <mat-step [label]="'Upload'">
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
        <p><strong>Domain:</strong> {{ website.domain }}</p>
        <p><strong>Type:</strong> {{ website.websitetype || 'Not selected' }}</p>
        <p><strong>File:</strong> {{ uploadedFile?.name || 'No file uploaded' }}</p>
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
  width: 75%; /* Compact */
  max-width: 600px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 30px;
  padding-left: 20px; /* Links uitlijnen */
}

.type-selection {
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding-top: 30px;
  padding-left: 20px; /* Links uitlijnen */
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
  domains: Website[] = [];
  uploadedFile: File | null = null;

  website: any = {
    name: '',
    domain: '',
    websitetype: '',
    status: 'active',
    visits: 0
  };

  constructor(
    private dialogRef: MatDialogRef<EditWebsitesComponent>,
    private websiteService: WebsiteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.domains = this.websiteService.addedWebsites;
  }

  selectType(type: 'poster' | 'ticket') {
    this.website.websitetype = type;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) this.uploadedFile = file;
  }

  isFormValid(): boolean {
    return !!(this.website.name && this.website.domain && this.website.websitetype);
  }

  saveWebsite() {
    console.log('Website data:', this.website);
    console.log('Uploaded file:', this.uploadedFile);
    this.dialogRef.close(this.website);
  }
}
