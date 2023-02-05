import { StorageService } from './../core/services/storage.service';
import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { event } from '../core/interfaces/event';
import { EventService } from '../core/services/event.service';
import { howLongFromPastDate } from '../core/helpers/time';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  filter: 'all' | 'finished' | 'earrings' = 'all';
  event?: event[];
  constructor(
    private EventService: EventService,
    private StorageService: StorageService
  ) {}

  ionViewWillEnter(): void {
    this.getEvents(this.filter);
  }

  async getEvents(filter: 'all' | 'finished' | 'earrings' = 'all'){
    const events: event[] = await this.EventService.getEvents(filter);
    this.event = events;
  }

  getTimeBeforeEvent(date: Date){
    return howLongFromPastDate(date);
  }
}
