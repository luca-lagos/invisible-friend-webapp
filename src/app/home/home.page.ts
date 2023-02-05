import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { event } from '../core/interfaces/event';
import { EventService } from '../core/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  event?: event[];
  constructor(private EventService: EventService) {}

  ionViewWillEnter(): void {
    this.EventService.getEvents().then((events) => {
      this.event = events ? events : [];
    });
  }
}

//SEGUIR EN MIN 27:00
