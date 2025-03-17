import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeFormComponent } from './edit-employee-form.component';

describe('EditEmployeeFormComponent', () => {
  let component: EditEmployeeFormComponent;
  let fixture: ComponentFixture<EditEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
