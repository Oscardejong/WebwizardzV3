import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDeleteDialogComponent>>;

  const dialogData = { name: 'Test Item' };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ConfirmDeleteDialogComponent,  // Let op: hier in imports, niet declarations
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
describe('ConfirmDeleteDialogComponent', () => {
  it('dummy test', () => {
    expect(true).toBe(true);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the injected name in the template', () => {
    const text = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement.textContent;
    expect(text).toContain(dialogData.name);
  });

  it('onNoClick should close dialog with false', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('onYesClick should close dialog with true', () => {
    component.onYesClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('clicking "Nee" button calls onNoClick', () => {
    spyOn(component, 'onNoClick');
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons.find(btn => btn.nativeElement.textContent.trim() === 'Nee')?.triggerEventHandler('click', null);
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('clicking "Ja" button calls onYesClick', () => {
    spyOn(component, 'onYesClick');
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons.find(btn => btn.nativeElement.textContent.trim() === 'Ja')?.triggerEventHandler('click', null);
    expect(component.onYesClick).toHaveBeenCalled();
  });
  
});
