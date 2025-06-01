import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDomainFormComponent } from './edit-domain-form.component';

// Meestal nodig bij Angular Material en forms in een standalone component
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditDomainFormComponent', () => {
  let component: EditDomainFormComponent;
  let fixture: ComponentFixture<EditDomainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditDomainFormComponent,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule  // Animaties uitzetten voor tests
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDomainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
