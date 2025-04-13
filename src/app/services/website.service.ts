import { Injectable } from '@angular/core';

export interface Website{
  name: string;
  domain: string;
  websitetype: string;
  status: string; 
  visits: number;
}



@Injectable({
  providedIn: 'root'
})
export class WebsiteService {


  addedWebsites: Website[] = [
    
    {
      name: 'Poster Wizard',
      domain: 'https://poster.webwizardz.com',
      websitetype: 'poster',
      status: 'active',
      visits: 1324
    },
    {
      name: 'Ticket Portal',
      domain: 'https://ticket.webwizardz.com',
      websitetype: 'ticket',
      status: 'inactive',
      visits: 230
    },
    {
      name: 'Event Posters',
      domain: 'https://eventposters.com',
      websitetype: 'poster',
      status: 'active',
      visits: 875
    },
    {
      name: 'QuickTickets',
      domain: 'https://quicktickets.com',
      websitetype: 'ticket',
      status: 'active',
      visits: 1960
    },
    {
      name: 'Design Posters',
      domain: 'https://designposters.com',
      websitetype: 'poster',
      status: 'inactive',
      visits: 113
    }
  ]

  constructor() { 
  }
}
