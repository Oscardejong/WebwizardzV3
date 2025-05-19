import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Website {
  WebsiteID?: number; // als je id's hebt
  name: string;
  DomainID?: number;
  domainname: string;
  status: string;
  type: string;
  // file-info:
  path?: string | null;
  originalname?: string | null;
  size?: number | null;
  mimetype?: string | null;
  uploadedAt?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  private apiUrl = `${environment.apiBaseUrl}/api/website`;
  private websiteDeleteUrl = `${environment.apiBaseUrl}/api/website/:name`;

  addedWebsites: Website[] = [];

  constructor(private http: HttpClient) {}

  // Maak een nieuw website record aan (incl. file upload)
// website.service.ts
createWebsite(payload: {
  fields: {
    name: string;
    domainname: string;       // <-- en NIET meer DomainID
    type: string;
    status: string;
  };
  file?: File;
}): Observable<Website> {
  const fd = new FormData();
  fd.append('name', payload.fields.name);
  fd.append('domainname', payload.fields.domainname);   // <-- aangepast
  fd.append('type', payload.fields.type);
  fd.append('status', payload.fields.status);
  if (payload.file) {
    fd.append('file', payload.file);
  }

  console.log('[WebsiteService] createWebsite: sending FormData');

  return this.http.post<{ success: boolean; data: Website }>(this.apiUrl, fd).pipe(
    map(res => res.data),
    catchError(err => {
      console.error('[WebsiteService] createWebsite: error:', err);
      return throwError(() => err);
    })
  );
}



  // Haal alle websites op
  getAllWebsites(): Observable<Website[]> {
    console.log('[WebsiteService] getAllWebsites: fetching websites from API:', this.apiUrl);
    return this.http
      .get<{ success: boolean; data: Website[] }>(this.apiUrl)
      .pipe(
        tap(res => console.log('[WebsiteService] getAllWebsites: raw response:', res)),
        map(res => res.data),
        tap(websites => {
          console.log('[WebsiteService] getAllWebsites: mapped websites array:', websites);
          this.addedWebsites = websites;
        }),
        catchError(err => {
          console.error('[WebsiteService] getAllWebsites: error fetching websites:', err);
          return of([]);
        })
      );
  }

  // Verwijder website op naam
  deleteWebsite(name: string): Observable<any> {
    const url = this.websiteDeleteUrl.replace(':name', encodeURIComponent(name));
    console.log(`[WebsiteService] deleteWebsite: sending DELETE to ${url}`);

    return this.http.delete(url).pipe(
      tap(() => {
        console.log(`[WebsiteService] deleteWebsite: website '${name}' successfully deleted`);
      }),
      catchError(error => {
        console.error(`[WebsiteService] deleteWebsite: error deleting website '${name}':`, error);
        return throwError(() => error);
      })
    );
  }
}
