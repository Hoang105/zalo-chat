import { RoomModel } from './../shared/model/room.model';
import { DbLocalService } from './../shared/data/db.service';
import { DataFriendsService } from './../shared/data/data-friends.service';
import { map } from 'rxjs/operators';
import { NotifyService } from './../service/notify.service';
import { UserId } from './../service/contact.service';
import { StorageService } from './../service/storage.service';
import { ChatModel } from './../shared/model/chat.model';
import { DataChatService } from './../shared/data/data-chat.service';
import { ChatService } from './../service/chat.service';
import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
})
export class ContentChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContentChat') private scrollContentChat: ElementRef;
  @Input() itemBoxChat: any;
  constructor(
    private chatService: ChatService,
    private dataChatService: DataChatService,
    private storageService: StorageService,
    private notifyService: NotifyService,
    private dataFriendsService: DataFriendsService,
    private dbLocalService: DbLocalService
  ) {}
  avatarUrl = this.storageService.get('avt');
  userid = this.storageService.get('userId');
  username = this.storageService.get('userName');
  roomChat: RoomModel;
  lastTimeConnect = 'Truy cập 1 giờ trước';
  listConversation = [];
  messageChat: ChatModel;
  roomid = '';

  ngOnInit(): void {
    this.dbLocalService.currentListMessage.subscribe((value) => {
      this.listConversation = value;
    });
    this.dataChatService.currentRoom.subscribe((room) => {
      if (room != 'default') {
        this.roomChat = room;
        this.listConversation = room.roomConversations;
        // if (this.listConversation.length === 0) {
        //   this.
        // }
      }
    });
  }

  getImage(owner) {
    let user = this.roomChat.roomMember.find((x) => x.userid === owner);
    return user.imgurl;
  }
  getUserName(owner) {
    let user = this.roomChat.roomMember.find((x) => x.userid === owner);
    return user.username;
  }

  sendMessage(message: string) {
    const member = this.roomChat.roomMember.map((x) => x.userId);
    if (message.length > 0) {
      let mess = new ChatModel(
        this.roomChat.roomId,
        this.userid,
        this.username,
        this.avatarUrl,
        member,
        message
      );
      this.notifyService.sendMessage(mess);
      this.chatService.putMessage(mess).then((value) => console.log(value));
    }
  }
  scrollToBottom(): void {
    try {
      this.scrollContentChat.nativeElement.scrollTop =
        this.scrollContentChat.nativeElement.scrollHeight;
    } catch (err) {}
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
