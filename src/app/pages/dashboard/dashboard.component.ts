import { Component, ElementRef, inject, viewChild, ViewChild } from '@angular/core';
import { WidgetComponent } from "../../components/widget/widget.component";
import { DashboardService } from '../../services/dashboard.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {wrapGrid} from 'animate-css-grid';
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'dashboard',
  imports: [WidgetComponent, MatButton, MatButtonModule, MatIcon, MatMenuModule, CdkDropList, CdkDropListGroup],
  providers: [DashboardService],
  template: `
  <div class="header">
   <h2>Dashboard</h2>
    <button mat-raised-button [mat-menu-trigger-for]="widgetMenu" class="add-widget-button" color="primary">
    <mat-icon>add_circle</mat-icon>
    Add Widget
    </button>
    <mat-menu #widgetMenu="matMenu">
      @for (widget of store.widgetsToAdd(); track widget.id) {
        <button mat-menu-item (click)="store.addWidget(widget)">
        {{widget.label}}
      </button>
      } @empty {
        <button mat-menu-item >
        No widgets to add
       </button>
      }
    </mat-menu>
  </div>

   <div 
   #dashboard
    class = "dashboard-widgets" cdkDropListGroup>
   @for (w of store.addedWidgets(); track w.id) {
    <app-widget cdkDropList [data]="w" (cdkDropListDropped)="drop($event)" [cdkDropListData]="w.id"/>
  }
  </div>




  `,
  styles: `


  
  .dashboard-widgets{
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
     grid-auto-rows: 150px;
     gap: 16px;
  }
  
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  

// .add-widget-button {
//   color: white;  
//   background-color: #007bff; 
//   border: none;  
//   transition: all 0.3s ease;  
// }


// .add-widget-button:hover {
//   color: white;  
//   background-color: #66b3ff;  
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
// }


// .add-widget-button:active {
//   color: white;  
//   background-color: #66ccff; 
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);  
// }


  
  
  
  `,
})
export class DashboardComponent {

  store = inject(DashboardService);

  dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit() {
    wrapGrid(this.dashboard().nativeElement,{ duration: 300});
  }


  drop(event: CdkDragDrop<number,any>){
    const { previousContainer, container } = event;    
    this.store.updateWidgetPosition(previousContainer.data, container.data);


  }


}
