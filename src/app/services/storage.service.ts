import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ArrayModel } from '../models/array.model'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  dbSubject = new Subject<ArrayModel[]>();

  private _url: any = '../assets/DB-Test/DB_Info.json';
  
  // private infoData: ArrayModel[] = [];

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<ArrayModel[]>(this._url).subscribe(
      (response: ArrayModel[]) => {
        const infoData = response['DB_Info']['TB_Profile'];
        this.dbSubject.next(infoData);
        console.log('From Service');
        console.log(response);
        console.log(infoData);

      }
    );
  }
}