import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Url } from '../shared/url';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  readonly url = Url.apiChat();
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io.io(this.url, { transports: ['websocket'] });
  }

  async getListRoom(model: any): Promise<any> {
    return this.http.post<any>(this.url + '/api/getRoom', model).toPromise();
  }

  async getListRoomChat(model: any): Promise<any> {
    return this.http
      .post<any>(this.url + '/api/getRoomChat', model)
      .toPromise();
  }
  async getMemberInRoom(model: any): Promise<any> {
    return this.http
      .post<any>(this.url + '/api/getMemberInRoom', model)
      .toPromise();
  }

  async getMessageFromRoom(model: any): Promise<any> {
    return this.http
      .post<any>(this.url + '/api/getMessageFromRoom', model)
      .toPromise();
  }
  async putMessage(model: any): Promise<any> {
    return this.http.post<any>(this.url + '/api/putMessage', model).toPromise();
  }
}
