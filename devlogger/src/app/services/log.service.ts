import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];
  data: Observable<any>;

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });//initial values. Should match a Log
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   { id: '1', text: 'Generated components', date: new Date('12/26/2017 12:54:23') },
    //   { id: '2', text: 'Added Bootstrap', date: new Date('12/27/2017 9:33:13') },
    //   { id: '3', text: 'Added logs component', date: new Date('12/27/2017 12:00:23') }
    // ]

    this.logs = [];
  }
  /*Option 1 - returning all the logs at the same time*/
  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }
  /*Option 2 - Loading feeling*/
  // getLogs(): Observable<Log> {
  //   //return of(this.logs);
  //   this.data = new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next({ id: '1', text: 'Generated components', date: new Date('12/26/2017 12:54:23') });
  //     }, 500);

  //     setTimeout(() => {
  //       observer.next({ id: '2', text: 'Added Bootstrap', date: new Date('12/27/2017 9:33:13') });
  //     }, 1000);

  //     setTimeout(() => {
  //       observer.next({ id: '3', text: 'Added logs component', date: new Date('12/27/2017 12:00:23') });
  //       observer.complete();
  //     }, 1500);
  //   });
  //   return this.data;
  // }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
  }

  clearState() {
    this.stateSource.next(true);
  }
}
