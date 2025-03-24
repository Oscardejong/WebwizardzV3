import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card class="dialog-card">
      <mat-card-header>
        <mat-icon mat-card-avatar color="warn">warning</mat-icon>
        <mat-card-title>Weet je zeker dat je wilt verwijderen?</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Wil je het item "{{ data.name }}" verwijderen? Deze actie kan niet ongedaan worden gemaakt.</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-button color="primary" (click)="onNoClick()">Nee</button>
        <button mat-button color="warn" (click)="onYesClick()">Ja</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .dialog-card {
        max-width: 400px;
        padding: 16px;
        text-align: center;
      }
      mat-card-header {
        display: flex;
        align-items: center;
        justify-content: start;
      }
      mat-card-title {
        font-size: 20px;
        margin-left: 10px;
      }
      mat-card-content {
        margin-bottom: 20px;
        font-size: 16px;
      }
      mat-card-actions {
        display: flex;
        justify-content: space-around;
      }
      button {
        width: 120px;
      }
    `
  ]
})
export class ConfirmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);  // Close the dialog and return 'false' for No
  }

  onYesClick(): void {
    this.dialogRef.close(true);   // Close the dialog and return 'true' for Yes
  }
}
