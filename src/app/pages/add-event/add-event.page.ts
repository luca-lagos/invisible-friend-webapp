import { EventService } from 'src/app/core/services/event.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { event } from 'src/app/core/interfaces/event';
import { empty_person } from 'src/app/core/interfaces/person';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  today = new Date().toISOString();

  actual_event: event = {
    title: '',
    people: [{ ...empty_person }, { ...empty_person }, { ...empty_person }],
    date: new Date(),
  };

  constructor(
    private navCtrl: NavController,
    private EventService: EventService
  ) {}

  ngOnInit() {}

  changeDatetime(event: any) {
    this.actual_event.date = new Date(event.detail.value);
  }

  async addEvent() {
    await this.EventService.setNewEvent(this.actual_event);
    this.goBack();
  }

  goBack() {
    this.navCtrl.navigateBack('');
  }
}
