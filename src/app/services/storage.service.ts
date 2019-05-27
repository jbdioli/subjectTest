import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ArrayModel } from '../models/array.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  dbSubject = new Subject<ArrayModel[]>();

  //private _url: any = '../assets/DB-Test/DB_Info.json';
  private _url: any = 'https://db-test-23664.firebaseio.com/DB_Info.json';

  // private infoData: ArrayModel[] = [];

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<ArrayModel[]>(this._url).subscribe(
      (response: ArrayModel[]) => {
        //const infoData = response['DB_Info']['TB_Profile'];
        const infoData = response;
        this.dbSubject.next(infoData);
        console.log('From response Service : ', response);
        console.log('From infoData Service : ', infoData);

      }
    );
  }

  sendData(data: ArrayModel[]) {
    return this.http.put(this._url, data);
  }

}
