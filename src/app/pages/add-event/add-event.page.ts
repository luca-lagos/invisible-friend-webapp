import { EventService } from 'src/app/core/services/event.service';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/core/services/toast.service';
import { AlertService } from 'src/app/core/services/alert.service';
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
    private EventService: EventService,
    private ToastService: ToastService,
    private AlertService: AlertService
  ) {}

  ngOnInit() {}

  changeDatetime(event: any) {
    this.actual_event.date = new Date(event.detail.value);
  }

  async addEvent() {
    const real_people = this.actual_event.people.filter(
      (person) => person.name !== ''
    );
    if (real_people.length < 3)
      return this.AlertService.presentAlert(
        'Warning',
        'An event must have a minimum of 3 people'
      );
    const raffledEvent = this.EventService.raffleEvent(this.actual_event);
    await this.EventService.setNewEvent(raffledEvent);
    this.ToastService.presentToast('Event created successfully');
    this.goBack();
  }

  addPeopleInput() {
    this.actual_event.people.push({ ...empty_person });
  }

  removePeopleInput(index: number) {
    this.actual_event.people.splice(index, 1);
  }

  goBack() {
    this.navCtrl.navigateRoot('');
  }
}
