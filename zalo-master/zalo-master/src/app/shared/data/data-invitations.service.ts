import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataInvitationsService {
  private list = [];
  private number = 0;
  private listI = new BehaviorSubject<any>([]);
  public currentListI = this.listI.asObservable();
  private numberBh = new BehaviorSubject<number>(0);
  public currentNumber = this.numberBh.asObservable();
  changeNumber(value) {
    this.numberBh.next(value);
  }
  changeList(value) {
    this.listI.next(value);
  }
  setList(value) {
    this.list = value;
  }
  getList() {
    return this.list;
  }
  remove() {
    this.list = [];
  }
  setNotify(value) {
    this.number = value;
  }
  getNotify(): number {
    return this.number;
  }
}
