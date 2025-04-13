import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebsitesComponent } from './edit-websites.component';

describe('EditWebsitesComponent', () => {
  let component: EditWebsitesComponent;
  let fixture: ComponentFixture<EditWebsitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWebsitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWebsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
