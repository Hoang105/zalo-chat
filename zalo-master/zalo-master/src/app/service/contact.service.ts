import { Url } from './../shared/url';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserId {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  readonly url = Url.apiFriend();
  readonly urlChat = Url.apiChat();

  constructor(private http: HttpClient) {}

  async getListFriends(model: UserId): Promise<any> {
    return await this.http
      .post(this.url + '/api/friend/getlistfriends', model)
      .toPromise();
  }

  async getListInvitations(model: UserId): Promise<any> {
    return await this.http
      .post(this.url + '/api/friend/getListFriendsInvitations', model)

      .toPromise();
  }

  async acceptFriend(model: any): Promise<any> {
    return await this.http
      .post(this.url + '/api/friend/acceptFriendRequest', model)
      .toPromise();
  }

  async denyFriend(model: any): Promise<any> {
    return await this.http
      .post(this.url + '/api/friend/denyfriendrequest', model)
      .toPromise();
  }

  async findFriend(model: any): Promise<any> {
    return await this.http
      .post(this.url + '/api/friend/finduser', model)
      .toPromise();
  }
  async deleteFriend(model: any): Promise<any> {
    return await this.http
      .post(this.url + '/api/friend/deletefriend', model)
      .toPromise();
  }
  async sendFriendInvitions(model: any): Promise<any> {
    return await this.http
      .post(this.url + '/api/friend/sendfriendinvitions', model)
      .toPromise();
  }
  async getRoomChatFromFriend(model: any): Promise<any> {
    return await this.http
      .post(this.urlChat + '/api/getRoomChat', model)
      .toPromise();
  }
  async createRoomChat(model: any): Promise<any> {
    return await this.http
      .post(this.urlChat + '/api/createNewRoomChat', model)
      .toPromise();
  }
  async editRoomChat(model: any): Promise<any> {
    return await this.http
      .post(this.urlChat + '/api/EditRoom', model)
      .toPromise();
  }
  getRoomChatUserId(model: any): Observable<any> {
    return this.http.post(this.urlChat + '/api/getRoomChat', model);
  }
}
