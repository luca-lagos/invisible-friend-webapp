import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private StorageService: StorageService) {}

  async getEvents(): Promise<event[]> {
    return await this.StorageService.get('event');
  }

  async getEventById(id: number): Promise<event | undefined> {
    const events: event[] = await this.getEvents();
    const event_selected = events.find((event) => event.id == id);
    console.log(event_selected);
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

  async editEvent(e: event) {
    const events = await this.getEvents();
    const new_events = events.filter((event) => event.id !== e.id);
    new_events.forEach((event) => {
      event.people.forEach((person) => (person.view_to = false));
      e.people.forEach((person) => (person.view_to = false));
      new_events.push(e);
      new_events.sort((a, b) => a.id! - b.id!);
      this.StorageService.set('events', new_events);
    });
  }

  async deleteEvent(id: number) {
    const events = await this.StorageService.get('events');
    const new_events = events.filter((event: event) => event.id !== id);
    console.log(new_events);
    this.StorageService.set('events', new_events);
  }
}
