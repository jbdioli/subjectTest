import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { ArrayModel } from '../models/array.model'
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  obsSubscription: Subscription;

  infoData: ArrayModel[]= [];

  constructor(private modalController: ModalController, public navCtrl: NavController, private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getData();
    this.obsSubscription = this.storageService.dbSubject.subscribe((value: ArrayModel[]) => {
      this.infoData = value;
    },
    (error) => {
      console.log(error);
    });
    console.log('From Page.ts');
    console.log(this.infoData);
  }

  ngOnDestroy() {
    this.obsSubscription.unsubscribe();
  }
}
