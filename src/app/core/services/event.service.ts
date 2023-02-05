import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private StorageService: StorageService) {}

  async getEvents(): Promise<event[]> {
    return await this.StorageService.get("event");
  }

  async getEventById(id: number): Promise<event | undefined> {
    const event_selected = this.event_default.find((event) => event.id == id);
    return event_selected;
  }

  async setNewEvent(event: event): Promise<number> {
    const new_event = event;
    let events: event[] = await this.getEvents();
    if (!events || events.length == 0) {
      events = [];
      new_event.id = 1;
    } else {
      new_event.id = events[events.length - 1].id! + 1;
    }
    console.log(new_event);
    events.push(new_event);
    this.StorageService.set('event', events);
    return new_event.id;
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
