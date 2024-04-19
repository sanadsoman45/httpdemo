import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  loginData = new BehaviorSubject<string>('');

  constructor() { }

  setAuthToken(data:string){
    this.loginData.next(data);
  }
}
