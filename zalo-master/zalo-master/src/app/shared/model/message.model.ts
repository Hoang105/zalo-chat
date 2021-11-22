import { CurrentDate } from './../helper/CurrentDate.Helper';

export class MessageModel {
  PK: string;
  SK: string;
  owner: string; //phát sinh theo một quy tắc
  time: string;
  message: string;
  avt: string;
  username: string;

  constructor(roomid, SK, owner, time, username, avt, mess) {
    this.PK = roomid;
    this.owner = owner;
    this.message = mess;
    this.time = time;
    this.username = username;
    this.avt = avt;
    this.SK = SK;
  }
}
