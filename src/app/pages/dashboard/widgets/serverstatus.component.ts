import { Component, ElementRef, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-serverstatus',
  imports: [],
  template: `
    <div class="h-[calc(100%-100px)] w-full">
      <canvas #chart></canvas>
    </div>
  `,
  styles: ``
})
export class ServerstatusComponent {
  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'doughnut',
      data: {
        labels: [
          'Active',
          'Offline',
          'Maintenance',
        ],
        datasets: [
          {
            data: [10, 40 , 5],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        },
      },
    });
  }
}
