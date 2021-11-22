import { CurrentDate } from './../helper/CurrentDate.Helper';

export class ChatModel {
  PK: string;
  SK: string;
  owner: string; //phát sinh theo một quy tắc
  time: string;
  message: string;
  avt: string;
  username: string;
  member: string[];
  constructor(roomid, userId, username, avt, member, mess) {
    this.PK = roomid;
    this.owner = userId;
    this.message = mess;
    this.time = CurrentDate.getCurrentTime();
    this.SK = 'chat#message#' + CurrentDate.getCurrentDate();
    this.username = username;
    this.avt = avt;
    this.member = member;
  }
}
