import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule],
  template: `
    <div class="countdown-container">
      <h1 class="countdown-title">Countdown to {{ targetDate | date: 'fullDate' }}</h1>
      <div class="countdown-timer">
        <span class="time-part">{{ days }} <strong>Days</strong></span>
        <span class="time-part">{{ hours }} <strong>Hours</strong></span>
        <span class="time-part">{{ minutes }} <strong>Minutes</strong></span>
        <span class="time-part">{{ seconds }} <strong>Seconds</strong></span>
      </div>
    </div>
  `,
  styles: [`
    .countdown-container {
      text-align: center;
      background-color: #f3f4f6;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
    }

    .countdown-title {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 20px;
    }

    .countdown-timer {
      font-size: 32px;
      font-weight: 600;
      color: #2980b9;
    }

    .time-part {
      margin: 0 10px;
      font-size: 40px;
    }

    .time-part strong {
      font-size: 18px;
      color: #7f8c8d;
    }
  `]
})
export class CountdownComponent implements OnInit, OnDestroy {
  targetDate: Date = new Date('2025-04-23T12:00:00'); 
  timer: any;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startCountdown() {
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date().getTime();
    const target = this.targetDate.getTime();
    const timeLeft = target - now;

    if (timeLeft > 0) {
      this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      this.minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      this.seconds = Math.floor((timeLeft / 1000) % 60);
    } else {
      this.days = this.hours = this.minutes = this.seconds = 0;
      clearInterval(this.timer);
      console.log("Countdown finished!");
    }
  }
}
