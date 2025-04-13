import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsVisitsComponent } from './statistics-visits.component';

describe('StatisticsVisitsComponent', () => {
  let component: StatisticsVisitsComponent;
  let fixture: ComponentFixture<StatisticsVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsVisitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
