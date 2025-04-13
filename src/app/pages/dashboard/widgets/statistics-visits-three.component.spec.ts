import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsVisitsThreeComponent } from './statistics-visits-three.component';

describe('StatisticsVisitsThreeComponent', () => {
  let component: StatisticsVisitsThreeComponent;
  let fixture: ComponentFixture<StatisticsVisitsThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsVisitsThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsVisitsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
