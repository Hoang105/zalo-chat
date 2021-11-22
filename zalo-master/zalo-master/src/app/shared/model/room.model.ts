import { StorageService } from './../../service/storage.service';
import { MessageModel } from './message.model';

export class RoomModel {
  private storageService: StorageService;
  roomId: string;
  roomType: string;
  roomName: string;
  roomImage: string;
  roomNotify: number;
  roomConversations: any[];
  roomMember: any[];

  constructor(roomId, roomType, roomMember, roomName, currentUser) {
    this.roomId = roomId;
    this.roomType = roomType;
    this.roomMember = roomMember;
    if (this.roomType === 'one') {
      if (currentUser === roomMember[0].userid) {
        this.roomName = roomMember[1].username;
        this.roomImage = roomMember[1].imgurl;
      } else {
        this.roomName = roomMember[0].username;
        this.roomImage = roomMember[0].imgurl;
      }
    } else {
      this.roomName = roomName;
      this.roomImage = '../../assets/group1.png';
    }
  }

  addMessage(message: MessageModel) {
    this.roomConversations.unshift(message);
  }
  getAllMessage() {
    return this.roomConversations;
  }
  getAllMember() {
    return this.roomMember;
  }
  setListConversitions(value) {
    this.roomConversations = value;
    console.log('run set list');
  }
  setListMember(list) {
    this.roomMember = list;
  }
}
