import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDomainDialogComponent } from './edit-dialog-domain.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('UpdateDomainDialogComponent', () => {
  let component: UpdateDomainDialogComponent;
  let fixture: ComponentFixture<UpdateDomainDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UpdateDomainDialogComponent>>;

  const mockDialogData = {
    start: '2025-06-01T08:00',
    end: '2025-06-01T17:00'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [UpdateDomainDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDomainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial start and end values from injected data', () => {
    expect(component.data.start).toBe(mockDialogData.start);
    expect(component.data.end).toBe(mockDialogData.end);
  });

  it('should close the dialog with null on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(null);
  });

  it('should close the dialog with data on save', () => {
    component.data.start = '2025-06-02T09:00';
    component.data.end = '2025-06-02T18:00';

    component.onSave();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.data);
  });

  it('should update start and end input values via ngModel', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input[type="datetime-local"]'));
    const startInput = inputs[0].nativeElement as HTMLInputElement;
    const endInput = inputs[1].nativeElement as HTMLInputElement;

    // Simulate user changing the start input
    startInput.value = '2025-07-01T10:00';
    startInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.data.start).toBe('2025-07-01T10:00');

    // Simulate user changing the end input
    endInput.value = '2025-07-01T19:00';
    endInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.data.end).toBe('2025-07-01T19:00');
  });
});
