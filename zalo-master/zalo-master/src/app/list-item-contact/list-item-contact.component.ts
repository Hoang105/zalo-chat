import { NotifyService } from './../service/notify.service';
import { DataInvitationsService } from './../shared/data/data-invitations.service';
import { ContactService } from './../service/contact.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataFriendsService } from './../shared/data/data-friends.service';
import { Role } from '../core/role/role';
import { DataChatService } from '../shared/data/data-chat.service';

@Component({
  selector: 'app-list-item-contact',
  templateUrl: './list-item-contact.component.html',
  styleUrls: ['./list-item-contact.component.scss'],
})
export class ListItemContactComponent implements OnInit {
  constructor(
    private contactServiec: ContactService,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private dataFriendsService: DataFriendsService,
    private dataInvitationsService: DataInvitationsService,
    private dataChatService: DataChatService,
    private notifyService: NotifyService
  ) {}
  @Output() emitItemBoxChat = new EventEmitter();
  selectedOptions: any;
  listFriend = [];
  ngOnInit(): void {
    // this.listFriend = this.dataFriendsService.getList();
    this.dataFriendsService.currentListFriend.subscribe((data) => {
      this.listFriend = data;
    });
    this.dataInvitationsService.currentListI.subscribe(() => {
      this.getListFriends();
    });
  }

  //get list friend
  async getListFriends(): Promise<any> {
    const id = this.storageService.get('userId');
    const result = await this.contactServiec.getListFriends({ id: id });
    this.listFriend = result.Items;
    this.dataFriendsService.changeList(this.listFriend);
  }

  //delete a friend
  async deletefriend() {
    let model = {
      id: this.storageService.get('userId'),
      idIsDeleted: this.selectedOptions[0].userid,
    };
    let res = await this.contactServiec.deleteFriend(model);
    if (res.message) {
      let result = await this.getListFriends();
      this.asyncdelete(model.idIsDeleted);
      this.snackBar.open('Xóa Bạn Thành Công', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['center'],
      });
    }
  }

  //get data item chat, to go box chat
  async goToChat(item: any) {
    this.emitItemBoxChat.emit(item);
    const userId = this.storageService.get('userId');
    const userName = this.storageService.get('userName');

    const modal = {
      userId: userId,
      roomName: `${item.username}`,
      roomImage: '../../assets/shiba1.jpg',
      roomNotify: '0',
      roomConversations: [],
      roomMember: [userId, item.userid],
      friendId: item.userid,
      isGroup: 0,
      leaderId: '',
      deputyTeamId: '',
    };
    const data = await this.contactServiec.createRoomChat(modal);
    this.dataChatService.room.next(data);
    const memberReceives = modal.roomMember.filter(
      (member) => member !== userId
    );
    memberReceives.forEach((idReceiver) => {
      this.notifyService.sendNewGroup(idReceiver);
    });
  }

  // notification delete, should put another file
  asyncdelete(idreceiver) {
    this.notifyService.sendDelete(idreceiver, {
      mess: 'xoas banj roif',
    });
  }
}
