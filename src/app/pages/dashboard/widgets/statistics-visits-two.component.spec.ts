import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsVisitsTwoComponent } from './statistics-visits-two.component';

describe('StatisticsVisitsTwoComponent', () => {
  let component: StatisticsVisitsTwoComponent;
  let fixture: ComponentFixture<StatisticsVisitsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsVisitsTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsVisitsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
