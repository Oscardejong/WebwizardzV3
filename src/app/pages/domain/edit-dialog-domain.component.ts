import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-domain-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Update Period</h2>

    <mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Start (date &amp; time)</mat-label>
        <input matInput type="datetime-local" [(ngModel)]="data.start" />
      </mat-form-field>

      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>End&nbsp;(date &amp; time)</mat-label>
        <input matInput type="datetime-local" [(ngModel)]="data.end" />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" (click)="onSave()">Update</button>
    </mat-dialog-actions>
  `
})
export class UpdateDomainDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { start: string; end: string },
    private dialogRef: MatDialogRef<UpdateDomainDialogComponent>
  ) {}

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(this.data);
  }
}
