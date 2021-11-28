import { RoomModel } from './../shared/model/room.model';
import { DbLocalService } from './../shared/data/db.service';
import { DataFriendsService } from './../shared/data/data-friends.service';
import { map, takeUntil } from 'rxjs/operators';
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
  OnDestroy,
} from '@angular/core';
import { pipe, Subject } from 'rxjs';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
})
export class ContentChatComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
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
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
  avatarUrl = this.storageService.get('avt');
  userid = this.storageService.get('userId');
  username = this.storageService.get('userName');
  roomChat: RoomModel;
  lastTimeConnect = 'Truy cập 1 giờ trước';
  listConversation = [];
  messageChat: ChatModel;
  roomid = '';
  private ngUnsubscribe = new Subject();
  ngOnInit(): void {
    this.dbLocalService.currentListMessage.subscribe((value) => {
      this.listConversation = value;
    });
    this.dataChatService.currentRoom.subscribe((room) => {
      if (room != 'default') {
        this.roomChat = room;
        this.listConversation = room.roomConversations;
      }
    });
    this.notifyService
      .listenMessage()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.dbLocalService.changeListMessage(data);
      });
  }

  getImage(owner) {
    let user = this.roomChat.roomMember.find((x) => x.userid === owner);
    // return user.imgurl;
  }
  getUserName(owner) {
    let user = this.roomChat.roomMember.find((x) => x.userid === owner);
    // return user.username;
  }

  async sendMessage(message: string) {
    const memberReceives = this.roomChat.roomMember.filter(
      (member) => member != this.userid
    );
    const member = this.roomChat.roomMember;
    if (message.length > 0) {
      let mess = new ChatModel(
        this.roomChat.roomId,
        this.userid,
        this.username,
        this.avatarUrl,
        member,
        message
      );
      // this.notifyService.sendMessageReceive(this.userid, message);
      const listMessage = this.dbLocalService.listMessage.getValue();
      listMessage.unshift(mess);
      // listMessage.shift();
      this.dbLocalService.changeListMessage(listMessage);
      memberReceives.forEach((idReceiver) => {
        this.notifyService.sendMessage(idReceiver, listMessage);
      });
      this.chatService.putMessage(mess);
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
