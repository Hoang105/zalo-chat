import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  private updata = new BehaviorSubject<boolean>(false);
  public isUpdata = this.updata.asObservable();
  listenUpddate() {
    this.updata.next(true);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key) || '';
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }
  setLoad(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  getLoad(key: string) {
    return localStorage.getItem(key) || 'true';
  }
}
