import { ChatModel } from './../shared/model/chat.model';
import { DbLocalService } from './../shared/data/db.service';
import { NotifyService } from './../service/notify.service';
import { DataChatService } from './../shared/data/data-chat.service';
import { StorageService } from './../service/storage.service';
import { ChatService } from './../service/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-chat',
  templateUrl: './list-item-chat.component.html',
  styleUrls: ['./list-item-chat.component.scss'],
})
export class ListItemChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private dataChatService: DataChatService,
    private storageService: StorageService,
    private notifyService: NotifyService,
    private dbLocal: DbLocalService
  ) {}

  listRoomChat = [];
  listConversition = [];
  lastMessage = 'hello';
  selectedOptions: any;

  selectedValue = 1;
  ngOnInit(): void {
    this.dataChatService.currentListRoomChat.subscribe((list) => {
      this.listRoomChat = list;
      console.log(this.listRoomChat);
    });
  }
  changeSelected() {
    this.dataChatService.changeIsShow(true);
    if (this.selectedOptions[0]) {
      let roomid = this.selectedOptions[0].roomId;
      this.selectedOptions[0].roomConversations = this.dbLocal.getAllMessageFromRoom(
        roomid
      );
      //console.log(this.selectedOptions[0]);
      this.chatService
        .getMessageFromRoom({
          roomid: roomid,
          type: 'chat',
        })
        .then((value) => {
          this.dbLocal.RoomObject[roomid].setListConversitions(value['Items']);
          this.dbLocal.changeListMessage(value['Items']);
        });
      //console.log(this.selectedOptions[0]);
      this.dataChatService.changSelectRoom(this.selectedOptions[0]);
    }
  }
}
