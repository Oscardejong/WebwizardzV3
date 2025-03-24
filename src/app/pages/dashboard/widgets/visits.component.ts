import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visits',
  imports: [MatIcon, CommonModule],
  template: `
<div class="flex items-center gap-1 mb-1">
  <p class="text-2xl font-semibold leading-none">2.500</p>
  <mat-icon class="text-lg" [ngStyle]="{ color: iconColor }">check_circle_outline</mat-icon>
</div>

    <div class="text-sm">
      <span [ngStyle]="{ color: textColor }">+200</span>
      <span> in the last 30 days </span>
    </div>
  `,
  styles: []
})
export class VisitsComponent {
  // Dynamische kleuren instellen
  iconColor = '#03C03C';  
  textColor = '#03C03C';  
}