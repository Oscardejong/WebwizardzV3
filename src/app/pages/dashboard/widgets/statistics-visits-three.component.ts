import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Chart from 'chart.js/auto';
import { WebsiteService, Website } from '../../../services/website.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics-visits-three',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="widget-container">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Search or select website</mat-label>
        <input
  type="text"
  matInput
  [(ngModel)]="selectedWebsiteName"
  [matAutocomplete]="auto"
  (ngModelChange)="onWebsiteChange()"
/>
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayWebsite">
          <mat-option *ngFor="let website of filteredWebsites()" [value]="website.name">
            {{ website.name }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>

      <button mat-raised-button class="mt-16" (click)="goToWebsiteTab()">
        Go to {{ selectedWebsiteName || 'website' }}
      </button>

      <div class="chart-container">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
  styles: [`
    .widget-container {
      padding: 16px;
      width: 100%;
    }
    .chart-container {
      height: 300px;
      width: 100%;
    }
    .full-width {
      width: 100%;
    }
  `]
})
export class StatisticsVisitsThreeComponent implements OnInit {
 @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  currentChart: any;

  websites: Website[] = [];
  selectedWebsiteName: string = '';

  websiteVisitsData: { [key: string]: number[] } = {};

  constructor(private router: Router, private websiteService: WebsiteService) {}

  ngOnInit(): void {
    this.websites = this.websiteService.addedWebsites;

    this.websites.forEach(site => {
      this.websiteVisitsData[site.name] = Array.from({ length: 7 }, () =>
        Math.floor(Math.random() * 1000)
      );
    });

    if (this.websites.length > 0) {
      this.selectedWebsiteName = this.websites[0].name;
      this.updateChart();
    }
  }

  filteredWebsites(): Website[] {
    const name = this.selectedWebsiteName?.toLowerCase() || '';
    return this.websites.filter(w => w.name.toLowerCase().includes(name));
  }

  displayWebsite = (name: string): string => name;

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (this.currentChart) {
      this.currentChart.destroy();
    }

    if (ctx && this.selectedWebsiteName) {
      this.currentChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Visits',
            data: this.websiteVisitsData[this.selectedWebsiteName],
            borderColor: 'rgb(255, 159, 64)', 
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            fill: 'start'
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          elements: {
            line: { tension: 0.4 }
          }
        }
      });
    }
  }
  onWebsiteChange(): void {
    if (this.websiteVisitsData[this.selectedWebsiteName]) {
      this.updateChart();
    }
  }

  goToWebsiteTab(): void {
    this.router.navigate(['/websites']);
  }
}
