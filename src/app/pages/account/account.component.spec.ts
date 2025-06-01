import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AccountService } from '../../services/account.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let accountServiceMock: jasmine.SpyObj<AccountService>;
  let dialog: MatDialog;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    accountServiceMock = jasmine.createSpyObj('AccountService', ['getAllAccountsWithCustomer', 'deleteAccount', 'updateAccount']);
    dialogMock   = jasmine.createSpyObj('MatDialog', ['open']); 
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    
    // Default mock return values
    accountServiceMock.getAllAccountsWithCustomer.and.returnValue(of([]));
    accountServiceMock.deleteAccount.and.returnValue(of({}));
    accountServiceMock.updateAccount.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [AccountComponent, NoopAnimationsModule, MatDialogModule],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.inject(MatDialog);
  });

  it('should open delete dialog and cancel deletion if dialog closed without confirmation', fakeAsync(() => {
    const account = { username: 'user1' } as any;

    // Mock dialog.open to return afterClosed Observable emitting false (cancel)
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(false),
      componentInstance: {},
    } as any);

    component.openDeleteDialog(account);
    tick();

    expect(dialog.open).toHaveBeenCalled(); // Dialog moet openen
    expect(snackBarMock.open).toHaveBeenCalledWith('Verwijdering geannuleerd', 'OK', { duration: 2000 });
    expect(accountServiceMock.deleteAccount).not.toHaveBeenCalled(); // Delete mag niet worden aangeroepen
  }));


  it('should not update account if update dialog is closed without result', fakeAsync(() => {
    const account = { username: 'user1' } as any;

    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(null), // dialog gesloten zonder bevestiging
      componentInstance: {},
    } as any);

    component.openUpdateUserDialog(account);
    tick();

    expect(accountServiceMock.updateAccount).not.toHaveBeenCalled();
    expect(snackBarMock.open).not.toHaveBeenCalled();
  }));

});
