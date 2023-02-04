import { Injectable } from '@angular/core';
import { event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getEvents(): event[] {
    return this.event_default;
  }

  async getEventById(id: number): Promise<event | undefined> {
    const event_selected = this.event_default.find((event) => event.id == id);
    return event_selected;
  }

  event_default: event[] = [
    {
      id: 1,
      title: 'Event One',
      people: [
        {
          name: 'John',
          view_to: false,
          gift_to: 'Elvo',
        },
        {
          name: 'Nadia',
          view_to: true,
          gift_to: 'Elvo',
        },
        {
          name: 'Luke',
          view_to: false,
          gift_to: 'Elvo',
        },
      ],
      date: new Date(),
      finished: false,
    },
    {
      id: 2,
      title: 'Event Two',
      people: [
        {
          name: 'Nadia',
          view_to: true,
          gift_to: 'Elvo',
        },
      ],
      date: new Date(),
      finished: true,
    },
    {
      id: 3,
      title: 'Event Three',
      people: [
        {
          name: 'John',
          view_to: false,
          gift_to: 'Elvo',
        },
      ],
      date: new Date(),
      finished: true,
    },
    {
      id: 4,
      title: 'Event Four',
      people: [
        {
          name: 'John',
          view_to: false,
          gift_to: 'Elvo',
        },
        {
          name: 'Nadia',
          view_to: true,
          gift_to: 'Elvo',
        },
      ],
      date: new Date(),
      finished: true,
    },
    {
      id: 5,
      title: 'Event Five',
      people: [
        {
          name: 'John',
          view_to: false,
          gift_to: 'Elvo',
        },
        {
          name: 'Luke',
          view_to: false,
          gift_to: 'Elvo',
        },
      ],
      date: new Date(),
      finished: true,
    },
  ];
}
