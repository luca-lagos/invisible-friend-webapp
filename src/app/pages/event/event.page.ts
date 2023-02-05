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
    });
  }

  ngOnInit() {}

  async showModal(index: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Show the gift',
      subHeader: 'Are you sure you see this info?',
      buttons: [
        {
          text: 'Show',
          role: 'show',
          data: {
            action: 'show',
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
    if (result.role === 'show') {
      this.event!.people[index].view_to = !this.event?.people[index].view_to;
    }
  }

  async deleteModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Delete the raffle',
      subHeader: 'Are you sure to delete this raffle?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          data: {
            action: 'yes',
          },
        },
        {
          text: 'No',
          role: 'no',
          data: {
            action: 'no',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role === 'no') return;
    if (result.role === 'yes') {
      this.EventService.deleteEvent(this.event!.id!);
    }
    console.log(this.event);
    this.goBack();
  }

  async repeatModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Repeat the raffle',
      subHeader: 'Are you sure to repeat this raffle?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          data: {
            action: 'yes',
          },
        },
        {
          text: 'No',
          role: 'no',
          data: {
            action: 'no',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role === 'no') return;
    if (result.role === 'yes') {
      const new_event = this.EventService.raffleEvent(this.event!);
      this.EventService.editEvent(new_event);
    }
  }

  async finishModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiando estado al evento',
      subHeader: this.event!.finished
        ? 'You want to restore this event?'
        : '¿You want to finish and block this event?',
      buttons: [
        {
          text: this.event!.finished ? 'Restore event' : 'Finish event',
          role: 'change',
          data: {
            action: 'change',
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
    if (result.role === 'cancel') return;
    if (result.role === 'change') {
      this.event!.finished = !this.event!.finished;
      this.EventService.editEvent(this.event!);
    }
    if(this.event!.finished) this.goBack();
  }

  goBack() {
    this.navCtrl.navigateBack('');
  }
}
