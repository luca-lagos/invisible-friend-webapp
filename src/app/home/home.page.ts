import { Component } from '@angular/core';
import { event } from '../core/interfaces/event';
import { person } from '../core/interfaces/person';
import { EventService } from '../core/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  event: event[];
  constructor(
    private EventService: EventService
  ) {
    this.event = EventService.getEvents();
  }
}

//SEGUIR EN MIN 27:00
