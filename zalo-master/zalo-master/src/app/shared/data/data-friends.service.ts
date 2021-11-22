import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataFriendsService {
  private listfriends = [];
  private number = 0;
  private numberBh = new BehaviorSubject<number>(0);
  public currentNumber = this.numberBh.asObservable();
  private listFriend = new BehaviorSubject<any>([]);
  public currentListFriend = this.listFriend.asObservable();
  setList(value) {
    this.listfriends = value;
  }
  getList() {
    return this.listfriends;
  }
  remove() {
    this.listfriends = [];
  }
  setNotify(value) {
    this.number = value;
  }
  getNotify(): number {
    return this.number;
  }
  changeNumber(value) {
    this.numberBh.next(value);
  }

  changeList(value) {
    this.listFriend.next(value);
  }
}
