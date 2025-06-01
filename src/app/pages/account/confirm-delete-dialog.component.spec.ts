import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDeleteDialogComponent>>;

  const dialogData = { name: 'Test Item' };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ConfirmDeleteDialogComponent,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the injected name in the template', () => {
    const text = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement.textContent;
    expect(text).toContain(dialogData.name);
  });

  it('onNoClick should close dialog with false', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('onYesClick should close dialog with true', () => {
    component.onYesClick();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('clicking "Nee" button calls onNoClick', () => {
    spyOn(component, 'onNoClick');
    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', null);
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('clicking "Ja" button calls onYesClick', () => {
    spyOn(component, 'onYesClick');
    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);
    expect(component.onYesClick).toHaveBeenCalled();
  });
});
