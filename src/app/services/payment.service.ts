import { Injectable } from '@angular/core';

export interface Payment {
  firstName: string;
  lastName: string;
  email: string;
  amount: number; // Bedrag van de betaling
  paymentMethod: string; 
  paymentDate: string; 
  status: string; // "Completed", "Pending", "Failed"
}

@Injectable({
  providedIn: 'root'
})


export class PaymentService {

  
  addedPayments: Payment[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      amount: 49.99,
      paymentMethod: 'Credit Card',
      paymentDate: '2025-03-17',
      status: 'Completed',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      amount: 89.99,
      paymentMethod: 'PayPal',
      paymentDate: '2025-03-16',
      status: 'Completed',
    },
    {
      firstName: 'James',
      lastName: 'Johnson',
      email: 'james.johnson@example.com',
      amount: 29.99,
      paymentMethod: 'Bank Transfer',
      paymentDate: '2025-03-10',
      status: 'Pending',
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      amount: 59.99,
      paymentMethod: 'Credit Card',
      paymentDate: '2025-03-05',
      status: 'Failed',
    },
    {
      firstName: 'Michael',
      lastName: 'Wilson',
      email: 'michael.wilson@example.com',
      amount: 19.99,
      paymentMethod: 'PayPal',
      paymentDate: '2025-03-12',
      status: 'Completed',
    },
  ];
  
  
    
  
  
  
  
  
  constructor() { }
}
