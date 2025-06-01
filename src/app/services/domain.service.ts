import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';  
import { catchError, tap, map } from 'rxjs/operators';  
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Domain {
    DomainID?: number;
  AccountID?: number;
  domainname: string;
  domainstatus: string;
  enddatetime: string;
  startdatetime: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class DomainService {
private apiUrl = `${environment.apiBaseUrl}/api/domain`;
private domainDeleteUrl = `${environment.apiBaseUrl}/api/domain/:domainName`;



  addedDomains: Domain[] = [];

  constructor(private http: HttpClient) {}

  // Maak een nieuw domein aan via een POST-aanroep
  createDomain(domain: Domain): Observable<any> {
    console.log('[DomainService] createDomain: sending domain:', domain);

    return this.http.post(this.apiUrl, domain).pipe(
      tap(response => {
        console.log('[DomainService] createDomain: response:', response);
      }),
      catchError(error => {
        console.error('[DomainService] createDomain: error:', error);
        return throwError(error);
      })
    );
  }

  getAllDomains(): Observable<Domain[]> {
    console.log('[DomainService] getAllDomains: fetching domains from API:', this.apiUrl);
    return this.http
      .get<{ success: boolean; data: Domain[] }>(this.apiUrl)
      .pipe(
        tap(res => console.log('[DomainService] getAllDomains: raw response:', res)),
        map(res => res.data),
        tap(domains => {
          console.log('[DomainService] getAllDomains: mapped domains array:', domains);
          this.addedDomains = domains;
        }),
        catchError(err => {
          console.error('[DomainService] getAllDomains: error fetching domains:', err);
          return of([]);
        })
      );
  }
// Voeg dit toe aan je DomainService

updateDomain(domainName: string, updatedDomain: Domain): Observable<any> {
  const url = `${this.apiUrl}/${encodeURIComponent(domainName)}`;
  console.log(`[DomainService] updateDomain: sending PUT to ${url}`, updatedDomain);
  
  return this.http.put(url, updatedDomain).pipe(
    tap(response => console.log('[DomainService] updateDomain: response', response)),
    catchError(error => {
      console.error('[DomainService] updateDomain: error', error);
      return throwError(() => error);
    })
  );
}

  // Verwijder een domein op basis van de domeinnaam via een DELETE-aanroep
  deleteDomain(domainName: string): Observable<any> {
    const url = this.domainDeleteUrl.replace(':domainName', encodeURIComponent(domainName));
    console.log(`[DomainService] deleteDomain: sending DELETE to ${url}`);

    return this.http.delete(url).pipe(
      tap(() => {
        console.log(`[DomainService] deleteDomain: domain '${domainName}' successfully deleted`);
      }),
      catchError(error => {
        console.error(`[DomainService] deleteDomain: error deleting domain '${domainName}':`, error);
        return throwError(() => error);
      })
    );
  }
}
