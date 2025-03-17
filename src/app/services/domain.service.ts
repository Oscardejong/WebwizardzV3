import { Injectable } from '@angular/core';
import { DomainComponent } from '../pages/domain/domain.component';


export interface Domain {
  domainName: string;
  userName: string;
  startingDate: string;
  expirationDate: string;
  status: string;
}


@Injectable({
  providedIn: 'root'
})
export class DomainService {
 addedDomains: Domain[] = [
    {
      domainName: 'example.com',
      userName: 'GoHost',
      startingDate: '2021-05-15',
      expirationDate: '2023-05-15',

      status: 'active',
    },
    {
      domainName: 'example.net',
      userName: 'Namecheap',
      startingDate: '2024-05-15',
      expirationDate: '2024-09-22',
      status: 'active',
    },
    {
      domainName: 'example.org',
      userName: 'Google Domains',
      startingDate: '2023-05-15',
      expirationDate: '2024-02-10',
      status: 'inactive',
    },
    {
      domainName: 'example.info',
      userName: 'HostGator',
      startingDate: '2022-05-15',
      expirationDate: '2025-07-30',
      status: 'active',
    },
    {
      domainName: 'example.biz',
      userName: 'Bluehost',
      startingDate: '2025-03-17',
      expirationDate: '2026-12-15',
      status: 'active',
    },
  ];
  constructor() { }
}
