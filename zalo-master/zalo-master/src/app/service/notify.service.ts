import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  readonly url = 'http://localhost:3200';
  socket: any;

  constructor() {
    this.socket = io.io(this.url, { transports: ['websocket'] });
  }

  connectNotify(id) {
    this.socket.emit('connectnotify', { id: id });
  }

  sendNotifyInvitations(id: string, model: any) {
    this.socket.emit('userconnect', { id, model });
  }

  sendDelete(id: string, model: any) {
    this.socket.emit('deletefriend', { id, model });
  }

  sendAccept(id: string, model: any) {
    this.socket.emit('sendaccept', { id, model });
  }

  listenAccept() {
    return new Observable((observer) => {
      this.socket.on('accept', (obj) => {
        observer.next(obj);
      });
    });
  }

  listenNotify() {
    return new Observable((observer) => {
      this.socket.on('notify', (obj) => {
        observer.next(obj);
      });
    });
  }

  listenDelete() {
    return new Observable((observer) => {
      this.socket.on('delete', (obj) => {
        observer.next(obj);
      });
    });
  }

  joinRom(id) {
    this.socket.emit('joinroom', { id: id });
  }

  sendMessage(id: string, data: any) {
    this.socket.emit('sendmessage', { id, data });
  }

  listenMessage() {
    return new Observable((observer) => {
      this.socket.on('getmessage', (obj) => {
        observer.next(obj);
      });
    });
  }

  sendMessageReceive(idSender, message) {
    this.socket.emit(`get123`, message);
  }

  listenMessageReceive(userId) {
    return new Observable((observer) => {
      this.socket.on(`get123`, (obj) => {
        observer.next(obj);
      });
    });
  }

  sendNewGroup(idReceiver) {
    this.socket.emit('sendNewGroup', { idReceiver });
  }

  listenNewGroup() {
    return new Observable((observer) => {
      this.socket.on(`getNewGroup`, (obj) => {
        observer.next(obj);
      });
    });
  }
}
