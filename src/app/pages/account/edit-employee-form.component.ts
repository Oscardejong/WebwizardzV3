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

@Component({
  selector: 'app-edit-employee-form',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatRadioModule, MatIcon, MatStepperModule, MatTooltipModule
  ],
  template: `
  <mat-horizontal-stepper [(selectedIndex)]="selectedStep"
  color="primary">
    <!-- Eerste stap -->
    <mat-step [label]="'Personal Information'">
      <div mat-dialog-title>
        <h1>Personal</h1>
      </div>
      <div mat-dialog-content class="content">
        <div class="row">
          <mat-form-field appearance="fill">
            <mat-label>First name</mat-label>
            <input matInput type="text" placeholder="First name">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Last name</mat-label>
            <input matInput type="text" placeholder="Last name">
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="fill">
            <mat-label>E-mail</mat-label>
            <input matInput type="text" placeholder="E-mailadress">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Date of birth</mat-label>
            <input matInput [matDatepicker]="picker">
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-radio-group aria-label="Select an option">
            <mat-radio-button value="male">Male</mat-radio-button>
            <mat-radio-button value="female">Female</mat-radio-button>
          </mat-radio-group>
        </div>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperNext
        color="primary">Next</button>
      </div>
    </mat-step>

    <!-- Tweede stap -->
    <mat-step [label]="'Account Settings'">
      <div mat-dialog-title>
        <h1>Account</h1>
      </div>
      <div mat-dialog-content class="content">
        <div class="row">
          <mat-form-field>
            <mat-label>Type</mat-label>
            <select matNativeControl required>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="fill">
            <mat-label>Username</mat-label>
            <input matInput type="text" placeholder="Username">
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" placeholder="Password">
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
            <input matInput type="password" placeholder="Repeat password">
          </mat-form-field>
          <button mat-raised-button 
                  matTooltip="Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
                  color="primary">
            <mat-icon>info</mat-icon>
          </button>
        </div>
      </div>
      <div mat-dialog-actions class="actions" >
  <button mat-button matStepperPrevious>Back</button>
  <button mat-button matStepperNext
  color="primary">Next</button>
</div>

    </mat-step>

    <!-- Derde stap -->
    <mat-step [label]="'Finish'">
      <div mat-dialog-title>
        <h1>Finish</h1>
      </div>
      <div mat-dialog-content class="content">
        <p>Review your information before saving.</p>
      </div>
      <div mat-dialog-actions class="actions">
        <button mat-button matStepperPrevious>Back</button>
        <button mat-raised-button color="primary">Save</button>
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
    }
  `
})
export class EditEmployeeFormComponent {
  selectedStep: number = 0;
}
