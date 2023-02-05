import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private StorageService: StorageService) {}

  async getEvents(
    filter: 'all' | 'finished' | 'earrings' = 'all'
  ): Promise<event[]> {
    const events = await this.StorageService.get('event');
    switch (filter) {
      case 'all':
        return events;
      case 'earrings':
        return events.filter((event: event) => event.finished !== true);
      case 'finished':
        return events.filter((event: event) => event.finished === true);
    }
  }

  async getEventById(id: number): Promise<event | undefined> {
    const events: event[] = await this.getEvents('all');
    const event_selected = events.find((event) => event.id == id);
    return event_selected;
  }

  async setNewEvent(event: event): Promise<number> {
    const new_event = event;
    let events: event[] = await this.getEvents('all');
    if (!events || events.length === 0) {
      events = [];
      new_event.id = 1;
    } else {
      new_event.id = events[events.length - 1].id! + 1;
    }
    events.push(new_event);
    this.StorageService.set('event', events);
    return new_event.id;
  }

  async editEvent(e: event) {
    const events: event[] = await this.StorageService.get('event');
    const new_events: event[] = events.filter(
      (event: event) => event.id != e.id
    );
    events.forEach((event) => {
      event.people.forEach((person) => (person.view_to = false));
    });
    new_events.push(e);
    new_events.sort((a, b) => a.id! - b.id!);
    this.StorageService.set('event', new_events);
    return;
  }

  async deleteEvent(id: number) {
    const events: event[] = await this.StorageService.get("event");
    const new_events: event[] = events.filter(
      (event: event) => event.id !== id
    );
    this.StorageService.set('event', new_events);
  }

  raffleEvent(event: event): event {
    const new_event = event;
    let people_available: string[] = [];
    event.people.forEach((person, index) => {
      if (person.name === '') {
        event.people.splice(index, 1);
        people_available.push(event.people[index].name);
      } else {
        people_available.push(person.name);
      }
    });
    new_event.people.forEach((person) => {
      let random: number | undefined;
      do {
        random = Math.floor(Math.random() * people_available.length);
      } while (person.name === people_available[random]);
      person.gift_to = people_available[random];
      people_available.splice(random, 1);
    });
    return new_event;
  }

}
