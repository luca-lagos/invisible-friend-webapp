import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private ToastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
