import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDialogComponent } from './edit-dialog-account.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateUserDialogComponent', () => {
  let component: UpdateUserDialogComponent;
  let fixture: ComponentFixture<UpdateUserDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UpdateUserDialogComponent>>;
  
  const mockData = {
    firstName: 'John',
    lastName: 'Doe',
    birthdate: new Date(1990, 1, 1),
    gender: 'm'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        UpdateUserDialogComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { ...mockData } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with injected data', () => {
    expect(component.data.firstName).toBe(mockData.firstName);
    expect(component.data.lastName).toBe(mockData.lastName);
    expect(component.data.birthdate).toEqual(mockData.birthdate);
    expect(component.data.gender).toBe(mockData.gender);
  });

  it('should close dialog with null when Cancel button clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const cancelButton = buttons.find(btn => btn.nativeElement.textContent.trim() === 'Cancel');
    expect(cancelButton).toBeTruthy('Cancel button not found');
    cancelButton!.triggerEventHandler('click', null);
    expect(dialogRefSpy.close).toHaveBeenCalledWith(null);
  });

  it('should close dialog with data when Update button clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const updateButton = buttons.find(btn => btn.nativeElement.textContent.trim() === 'Update');
    expect(updateButton).toBeTruthy('Update button not found');
    updateButton!.triggerEventHandler('click', null);
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.data);
  });

  it('should update firstName when input changes', () => {
    const input = fixture.debugElement.query(By.css('input[matinput], input[matInput]')).nativeElement;
    input.value = 'Jane';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.data.firstName).toBe('Jane');
  });

it('should update gender when radio button clicked', () => {
  const femaleInput: HTMLInputElement | null = fixture.nativeElement.querySelector('input[type="radio"][value="f"]');
  expect(femaleInput).toBeTruthy('female radio input not found');

  if (femaleInput) {
    femaleInput.checked = true;
    femaleInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.data.gender).toBe('f');
  }
});


});
