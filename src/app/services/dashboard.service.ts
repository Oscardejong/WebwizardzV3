import { computed, effect, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { StatusComponent } from '../pages/dashboard/widgets/status.component';
import { ViewsComponent } from '../pages/dashboard/widgets/views.component';
import { PaymentsComponent } from '../pages/dashboard/widgets/payments.component';
import { PersonalinfoComponent } from '../pages/dashboard/widgets/personalinfo.component';
import { AnalyticsComponent } from '../pages/dashboard/widgets/analytics.component';
import { ServerstatusComponent } from '../pages/dashboard/widgets/serverstatus.component';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Status',
      content: StatusComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 3,
      label: 'Personal Info',
      content: PersonalinfoComponent,
      rows: 2,
      columns: 2,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },
    {
      id: 4,
      label: 'Payments history',
      content: PaymentsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke'
    },

    {
      id: 5,
      label: 'Sales Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 3,
    },

    {
      id: 6,
      label: 'Server status',
      content: ServerstatusComponent,
      rows: 3,
      columns: 1,
    }


  ]);

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
  const addedIds = this.addedWidgets().map(w => w.id);
  return this.widgets().filter(w => !addedIds.includes(w.id)); 
  });

  addWidget(w: Widget) {
  this.addedWidgets.set([...this.addedWidgets(), {...w}]);
 
}



updateWidget(id: number, widget: Partial<Widget>) {
  const index = this.addedWidgets().findIndex(w => w.id === id);
  if(index !== -1){
    const newWidgets = [...this.addedWidgets()];
    newWidgets[index] = {...newWidgets[index], ...widget} 
    this.addedWidgets.set(newWidgets);
  }
}
  
moveWidgetToRight(id: number) {
  const index = this.addedWidgets().findIndex(w => w.id === id);
  if (index === this.addedWidgets().length - 1) {
    return;
  }

  const newWidgets = [...this.addedWidgets()];
  [newWidgets[index], newWidgets[index + 1]] = [{...newWidgets[index + 1]}, {...newWidgets[index]}];

  this.addedWidgets.set(newWidgets);
}


moveWidgetToLeft(id: number) {
  const index = this.addedWidgets().findIndex(w => w.id === id);
  if (index === 0) {
    return;
  }

  const newWidgets = [...this.addedWidgets()];
  [newWidgets[index], newWidgets[index - 1]] = [{...newWidgets[index - 1]}, {...newWidgets[index]}];

  this.addedWidgets.set(newWidgets);
}

removeWidget(id: number) {
  this.addedWidgets.set(this.addedWidgets().filter(w => w.id !== id));
}


  constructor() {
    this.fetchWidgets();

  }

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach(widget => {
        const content = this.widgets().find(w => w.id === widget.id)?.content;
        if (content) {
          widget.content = content; 
       }
      })
  
      this.addedWidgets.set(widgets);
  
    }
  
  
  
  }
  
  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number){
    const sourceIndex = this.addedWidgets().findIndex(w => w.id === sourceWidgetId);
  
    if (sourceIndex === -1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targetIndex = newWidgets.findIndex(w => w.id === targetWidgetId);
    if (targetIndex === -1) {
      return;
    }

    const insertAt =  targetIndex === sourceIndex ? targetIndex + 1 : targetIndex;

    newWidgets.splice(insertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);


  }







  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({...w}));
    widgetsWithoutContent.forEach(w => {delete w.content;});
    
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetsWithoutContent));
  })

 
}
