import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDomainFormComponent } from './edit-domain-form.component';

describe('EditDomainFormComponent', () => {
  let component: EditDomainFormComponent;
  let fixture: ComponentFixture<EditDomainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDomainFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDomainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
