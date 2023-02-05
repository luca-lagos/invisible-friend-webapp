import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { event } from 'src/app/core/interfaces/event';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event?: event;
  result?: string;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private EventService: EventService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) {
    ActivatedRoute.params.subscribe((params) => {
      this.EventService.getEventById(params['id']).then((event) => {
        this.event = event;
      });
      console.log(this.event);
    });
  }

  ngOnInit() {}

  async showModal(index: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Show the gift',
      subHeader: 'Are you sure you see this info?',
      buttons: [
        {
          text: 'Hide',
          role: 'hide',
          data: {
            action: 'hide',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role === 'hide') {
      this.event!.people[index].view_to = !this.event?.people[index].view_to;
    }
  }

  goBack() {
    this.navCtrl.navigateBack('');
  }
}
