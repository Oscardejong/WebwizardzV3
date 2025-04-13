import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  // standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div> 
    <button mat-raised-button class="mt-16">Go to channel analytics</button>
  `,
  styles: `
    .chart-container {
      height: calc(100% - 100px);
      width: 100%;
    }
  `
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Payments',
          data: [30, 60, 25, 40, 50, 60, 80],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: 'start'
        }]
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          },
        },
      },
    });
  }
}
