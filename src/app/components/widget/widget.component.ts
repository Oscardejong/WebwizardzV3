import { Component, Host, input, signal } from '@angular/core';
import { Widget } from '../../models/dashboard';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WidgetOptionsComponent } from './widget-options/widget-options.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet, MatButtonModule, MatIconModule, WidgetOptionsComponent, CdkDrag, CdkDragPlaceholder],
  template: `
    <div class= "container mat-elevation-z3" 
    [style.background-color]="data().backgroundColor ?? 'white'"
    [style.color]="data().color ?? 'inherit'"
    cdkDrag
    cdkDragPreviewContainer="parent"
    > 

    <div class="header" cdkDragHandle>
      <h3 class="m-0">{{ data().label }}</h3>
      <button mat-icon-button class="settings-button" (click)="openOptions()">
        <mat-icon>settings</mat-icon>
      </button>
    </div>
    <ng-container [ngComponentOutlet]="data().content"/>

    @if (showOptions()){
      <app-widget-options  [data]="data()" (close)="closeOptions()"></app-widget-options>

    }

      <div *cdkDragPlaceholder></div>
    </div>




  `,
  styles: `
  
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    cursor: move;
    
  }




  .settings-button{
    position: absolute;
    top: 20px;
    right: 20px;
  }

  

  :host{
    display: block;
    border-radius: 16px;    
  }

  .container{
    position: relative;
    height: 100%;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
    border-radius: inherit;
    overflow: hidden;
    background: white; 
      
      /* Schaduw toevoegen */
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
      border: 2px solid rgba(0, 0, 0, 0.1); 
      border-radius: 16px;  
      background-color: #fff;
  }


`,

host: {
  '[style.grid-area]': '"span " + (data().rows ?? 1) + " / span " + (data().columns ?? 1)'
}


})



export class WidgetComponent {

 data = input.required<Widget>();

  

 showOptions = signal(false);

 openOptions(){
  this.showOptions.set(true);
 }

 closeOptions(){
  this.showOptions.set(false);
 }

}
