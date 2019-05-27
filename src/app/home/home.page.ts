import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { ArrayModel } from '../models/array.model';
import { StorageService } from '../services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  obsSubscription: Subscription;
  memoryForm: FormGroup;

  infoData: ArrayModel[] = [];

  constructor(private modalController: ModalController,
              public navCtrl: NavController,
              private storageService: StorageService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.storageService.getData();
    this.obsSubscription = this.storageService.dbSubject.subscribe((value: ArrayModel[]) => {
      this.infoData = value;
      console.log('From Page.ts : ', this.infoData);
    },
      (error) => {
        console.log('Error : ', error);
      });

    this.intiForm();
  }

  intiForm() {
    this.memoryForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      });
    console.log('Form created : ', this.memoryForm.value);
  }

  saveMemory() {
     this.infoData[0].firstName = this.memoryForm.value.firstName;
     this.infoData[0].lastName = this.memoryForm.value.lastName;
     this.storageService.sendData(this.infoData).subscribe(
       (response) => console.log(response),
       (error) => console.log('Error from server : ', error),
     );

    console.log('array :', this.infoData);
    console.log('memory form : ', this.memoryForm.value);
  }

  ngOnDestroy() {
    this.obsSubscription.unsubscribe();
  }
}
