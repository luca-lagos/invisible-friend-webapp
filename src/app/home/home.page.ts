import { StorageService } from './../core/services/storage.service';
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
  filter: 'earrings' | 'finished' | 'all' = 'earrings';
  event?: event[];
  constructor(
    private EventService: EventService,
    private StorageService: StorageService
  ) {}

  ionViewWillEnter(): void {
    this.getEvents(this.filter);
  }

  async getEvents(filter: 'earrings' | 'finished' | 'all' = 'earrings'){
    const events: event[] = await this.EventService.getEvents(filter);
    this.event = events;
    console.log(this.event);
  }
}

//SEGUIR EN MIN 27:00
