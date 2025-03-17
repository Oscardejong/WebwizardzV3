import { Component, model, Output, EventEmitter, input, inject } from '@angular/core';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Widget } from '../../../models/dashboard';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-widget-options',
  imports: [MatButtonModule, MatIcon, MatButtonToggleModule, ],
  template: `
    <button mat-icon-button class="close-button" (click)="closeOptions()">
      <mat-icon>close</mat-icon>
    </button>  

    <div>
      Width

      <mat-button-toggle-group 
      hideSingleSelectionIndicator="true" 
      [value]="data().columns ?? 1"
      (change)="store.updateWidget(data().id, {columns: +$event.value})"
      >
        <mat-button-toggle [value]="1">1</mat-button-toggle>
        <mat-button-toggle [value]="2">2</mat-button-toggle>
        <mat-button-toggle [value]="3">3</mat-button-toggle>
        <mat-button-toggle [value]="4">4</mat-button-toggle>
      </mat-button-toggle-group>

    </div>
    <div>
      Height

      <mat-button-toggle-group 
      hideSingleSelectionIndicator="true" 
      [value]="data().rows ?? 1"
      (change)="store.updateWidget(data().id, {rows: +$event.value})"
      >
        <mat-button-toggle [value]="1">1</mat-button-toggle>
        <mat-button-toggle [value]="2">2</mat-button-toggle>
        <mat-button-toggle [value]="3">3</mat-button-toggle>
        <mat-button-toggle [value]="4">4</mat-button-toggle>
      </mat-button-toggle-group>

    </div>

    <button mat-icon-button class="move-forward-button" (click)="store.moveWidgetToRight(data().id)">
      <mat-icon>chevron_right</mat-icon>
    </button>  

    <button mat-icon-button class="move-backward-button" (click)="store.moveWidgetToLeft(data().id)">
      <mat-icon>chevron_left</mat-icon>
    </button>  

    <button mat-icon-button class="remove-widget-button" (click)="store.removeWidget(data().id)">
      <mat-icon>delete</mat-icon>
    </button>  






  `,
  styles: `



  
  :host{
    position: absolute;
    z-index: 2;
    background: whitesmoke;
    color: black;
    top: 0;
    left: 0;
    border-radius: inherit;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    --mat-standard-button-toggle-height: 16px;

    > div{
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 8px;

    }



  }

  .close-button{
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .move-forward-button{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0px;
  }

  .move-backward-button{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0px;
  }
  
  .remove-widget-button{
    position: absolute;
    top: 0;
    left: 0;
    color: #cc0000;
  }
  
  `
})
export class WidgetOptionsComponent {

  data = input.required<Widget>();

  @Output() close = new EventEmitter<void>();

  closeOptions(){
    this.close.emit();
  }

  store = inject(DashboardService);
}
