import { ChatModel } from './../model/chat.model';
import { ListItemChatComponent } from './../../list-item-chat/list-item-chat.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataChatService {
  readonly url = 'http://localhost:3000';
  socket: any;
  public room = new BehaviorSubject<any>('default');
  public currentRoom = this.room.asObservable();

  public listRoomChat = new BehaviorSubject<any>([]);
  public currentListRoomChat = this.listRoomChat.asObservable();

  private isShowContentChat = new BehaviorSubject<boolean>(false);
  public currentIsShowContentChat = this.isShowContentChat.asObservable();

  private newMessage = new BehaviorSubject<boolean>(false);
  public currentNewMessage = this.newMessage.asObservable();

  constructor() {
    this.socket = io.io(this.url, { transports: ['websocket'] });
  }

  changeListRoom(list) {
    this.listRoomChat.next(list);
  }
  changSelectRoom(room) {
    this.room.next(room);
  }

  changeIsShow(value) {
    this.isShowContentChat.next(value);
  }

  changStateMessage(value) {
    this.newMessage.next(value);
  }
}
