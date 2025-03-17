import { Injectable } from '@angular/core';



export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: 'male' | 'female';
  accountType: 'admin' | 'user';
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  

  addedAccounts: Account[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: '1990-05-15',
      gender: 'male',
      accountType: 'admin',
      username: 'johndoe90',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      birthDate: '1985-09-22',
      gender: 'female',
      accountType: 'user',
      username: 'janesmith85',
    },
    {
      firstName: 'James',
      lastName: 'Johnson',
      email: 'james.johnson@example.com',
      birthDate: '1980-02-10',
      gender: 'male',
      accountType: 'admin',
      username: 'jamesj80',
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      birthDate: '1995-07-30',
      gender: 'female',
      accountType: 'user',
      username: 'emilydavis95',
    },
    {
      firstName: 'Michael',
      lastName: 'Wilson',
      email: 'michael.wilson@example.com',
      birthDate: '1992-12-05',
      gender: 'male',
      accountType: 'user',
      username: 'michaelw92',
    },
  ];

  constructor() { }
}
