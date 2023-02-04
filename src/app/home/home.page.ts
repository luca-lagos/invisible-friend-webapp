import { Component } from '@angular/core';
import { event } from '../core/interfaces/event';
import { person } from '../core/interfaces/person';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  events: event[] = [
    {
      id: 1,
      title: 'Event One',
      people: [
        {
          name: 'John',
          gift_to: false,
        },
        {
          name: 'Nadia',
          gift_to: true,
        },
        {
          name: 'Luke',
          gift_to: false,
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
          gift_to: true,
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
          gift_to: false,
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
          gift_to: false,
        },
        {
          name: 'Nadia',
          gift_to: true,
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
          gift_to: false,
        },
        {
          name: 'Luke',
          gift_to: false,
        },
      ],
      date: new Date(),
      finished: true,
    },
  ];
}

//SEGUIR EN MIN 27:00
