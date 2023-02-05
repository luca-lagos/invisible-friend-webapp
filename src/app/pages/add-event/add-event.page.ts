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
    people: [empty_person, empty_person, empty_person],
    date: new Date(),
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateBack('');
  }
}
