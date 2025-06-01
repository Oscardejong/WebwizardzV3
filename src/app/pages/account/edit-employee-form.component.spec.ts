import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditEmployeeFormComponent } from './edit-employee-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { of, throwError } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('EditEmployeeFormComponent', () => {
  let component: EditEmployeeFormComponent;
  let fixture: ComponentFixture<EditEmployeeFormComponent>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditEmployeeFormComponent>>;

  beforeEach(async () => {
    const accountServiceMock = jasmine.createSpyObj('AccountService', ['createAccount', 'updateAccount']);
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [EditEmployeeFormComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { mode: 'create' } },
        provideAnimations()  // <-- Hier toevoegen!
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployeeFormComponent);
    component = fixture.componentInstance;

    accountServiceSpy = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EditEmployeeFormComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isFormValid', () => {
    it('should return false if required fields are missing', () => {
      component.account = {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        gender: '',
        username: '',
        password: '',
        repeatPassword: '',
        accounttype: '',
      };
      expect(component.isFormValid()).toBeFalse();
    });

    it('should return false if passwords do not match', () => {
      component.account = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        birthdate: '1990-01-01',
        gender: 'm',
        username: 'johndoe',
        password: 'password1',
        repeatPassword: 'password2',
        accounttype: 'User',
      };
      expect(component.isFormValid()).toBeFalse();
    });

    it('should return true if all required fields are present and passwords match', () => {
      component.account = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        birthdate: '1990-01-01',
        gender: 'm',
        username: 'johndoe',
        password: 'Password1!',
        repeatPassword: 'Password1!',
        accounttype: 'User',
      };
      expect(component.isFormValid()).toBeTrue();
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date(2020, 4, 9); // May 9, 2020
      expect(component.formatDate(date)).toBe('2020-05-09');
    });

    it('should return empty string for invalid date', () => {
      expect(component.formatDate('invalid')).toBe('');
    });
  });

  describe('saveAccount', () => {
    beforeEach(() => {
      component.account = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        birthdate: new Date(1990, 0, 1),
        gender: 'f',
        username: 'janedoe',
        password: 'Password1!',
        repeatPassword: 'Password1!',
        accounttype: 'Admin',
      };
      component.privacyAccepted = true;
    });

    it('should not save if form is invalid or privacy not accepted', () => {
      component.privacyAccepted = false;
      component.saveAccount();
      expect(component.privacyTouched).toBeTrue();
      expect(dialogRefSpy.close).not.toHaveBeenCalled();
    });

    it('should call createAccount and close dialog on success in create mode', fakeAsync(() => {
      accountServiceSpy.createAccount.and.returnValue(of({}));
      component.mode = 'create';

      component.saveAccount();
      tick();

      expect(accountServiceSpy.createAccount).toHaveBeenCalled();
      expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
      expect(component.backendErrorMessage).toBeNull();
    }));

    it('should call updateAccount and close dialog on success in edit mode', fakeAsync(() => {
      accountServiceSpy.updateAccount.and.returnValue(of({}));
      component.mode = 'edit';

      component.saveAccount();
      tick();

      expect(accountServiceSpy.updateAccount).toHaveBeenCalledWith(component.account.username, jasmine.any(Object));
      expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
      expect(component.backendErrorMessage).toBeNull();
    }));

    it('should set backendErrorMessage on error with error.error.error', fakeAsync(() => {
      const errorResponse = { error: { error: 'Some backend error' } };
      accountServiceSpy.createAccount.and.returnValue(throwError(() => errorResponse));
      component.mode = 'create';

      component.saveAccount();
      tick();

      expect(component.backendErrorMessage).toBe('Some backend error');
      expect(dialogRefSpy.close).not.toHaveBeenCalled();
    }));

    it('should set generic backendErrorMessage on error without error.error.error', fakeAsync(() => {
      const errorResponse = { error: {} };
      accountServiceSpy.createAccount.and.returnValue(throwError(() => errorResponse));
      component.mode = 'create';

      component.saveAccount();
      tick();

      expect(component.backendErrorMessage).toBe('Er is een fout opgetreden bij het opslaan.');
      expect(dialogRefSpy.close).not.toHaveBeenCalled();
    }));
  });
});
