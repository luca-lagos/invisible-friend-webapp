import { Component } from '@angular/core';
import { event } from '../core/interfaces/event';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  events: event[] = [
    {
      title: 'Event One',
      people: ['Juan', 'Maria'],
    },
    {
      title: 'Event Two',
      people: ['Juan', 'Maria'],
    },
    {
      title: 'Event Three',
      people: ['Juan', 'Maria'],
    },
    {
      title: 'Event Four',
      people: ['Juan', 'Maria'],
    },
    {
      title: 'Event Five',
      people: ['Juan', 'Maria'],
    },
  ];
}
