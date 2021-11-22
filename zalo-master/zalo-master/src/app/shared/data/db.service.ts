import { MessageModel } from './../model/message.model';

import { RoomModel } from './../model/room.model';
import { UserModel } from './../model/user.model';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbLocalService {
  listRoom: any[] = [];
  private listMessage = new BehaviorSubject<any>([]);
  public currentListMessage = this.listMessage.asObservable();

  RoomObject = {};
  UserObject = {};

  addNewRoom(roomModel: RoomModel) {
    this.listRoom.unshift(roomModel);
  }

  addMessage(roomid, message: MessageModel) {
    if (this.RoomObject.hasOwnProperty(roomid)) {
      this.RoomObject[roomid].addMessage(message);
    }
  }

  getAllMessageFromRoom(roomid) {
    if (this.RoomObject.hasOwnProperty(roomid)) {
      return this.RoomObject[roomid].getAllMessage();
    }
  }

  changeListMessage(value) {
    this.listMessage.next(value);
  }

  getAllRoom() {
    return new Promise((resolve, reject) => {
      let arrRoom: any[] = [];
      for (const key in this.RoomObject) {
        arrRoom.push(this.RoomObject[key]);
      }
      resolve(arrRoom);
    });
  }
}
