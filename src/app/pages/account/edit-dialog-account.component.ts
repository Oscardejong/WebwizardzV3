import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-user-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatRadioModule,
    FormsModule, MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Update User Info</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>First Name</mat-label>
        <input matInput [(ngModel)]="data.firstName" />
      </mat-form-field>

      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Last Name</mat-label>
        <input matInput [(ngModel)]="data.lastName" />
      </mat-form-field>

      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Birthdate</mat-label>
        <input matInput [matDatepicker]="picker" [(ngModel)]="data.birthdate" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-radio-group [(ngModel)]="data.gender" style="margin-top: 10px;">
        <mat-radio-button value="m">Male</mat-radio-button>
        <mat-radio-button value="f">Female</mat-radio-button>
      </mat-radio-group>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" (click)="onSave()">Update</button>
    </mat-dialog-actions>
  `
})
export class UpdateUserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateUserDialogComponent>
  ) {}

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(this.data);
  }
}
