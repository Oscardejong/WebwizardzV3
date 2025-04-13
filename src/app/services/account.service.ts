import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';  // 'of' importeren om nepdata te simuleren
import { catchError, tap } from 'rxjs/operators';  
import { throwError } from 'rxjs';  

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  gender: 'male' | 'female';
  accounttype: 'admin' | 'user';
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/api/account'; 
  private accountCustomerUrl = 'http://localhost:3000/api/account-customer';
  private accountDeleteUrl = 'http://localhost:3000/api/account/:username';

  addedAccounts: Account[] = [
  ];

  constructor(private http: HttpClient) {}

 
  createAccount(account: Account): Observable<any> {
    console.log('Trying to create account:', account);

    // Stuur het account naar de API via een POST-aanroep
    return this.http.post(this.apiUrl, account).pipe(
      tap(response => {
        console.log('Account creation response:', response);  // Log de response van de API
      }),
      catchError(error => {
        console.error('Error during account creation:', error);  // Log eventuele fouten
        return throwError(error);  // Gooi de fout door zodat deze kan worden afgehandeld door de component
      })
    );
  }
  getAllAccountsWithCustomer(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountCustomerUrl).pipe(
      tap(data => {
        console.log('Fetched account-customer data:', data);
        this.addedAccounts = data; // ✅ Vul de lijst automatisch
      }),
      catchError(error => {
        console.error('Error fetching account-customer data:', error);
        return of([]); // Retourneer lege lijst bij fout
      })
    );
  }

  deleteAccount(username: string): Observable<any> {
    const url = `${this.apiUrl}/${encodeURIComponent(username)}`;
    console.log(`Sending DELETE request to: ${url}`);

    return this.http.delete(url).pipe(
      tap(() => {
        console.log(`Account '${username}' successfully deleted`);
      }),
      catchError(error => {
        console.error(`Error deleting account '${username}':`, error);
        return throwError(() => error);
      })
    );
  }
  
}