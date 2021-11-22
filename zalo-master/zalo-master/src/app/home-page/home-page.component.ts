import { throwError } from 'rxjs';
import { UserModel } from './../shared/model/user.model';
import { DbLocalService } from './../shared/data/db.service';
import { DataChatService } from './../shared/data/data-chat.service';
import { ChatService } from './../service/chat.service';
import { NotifyPanelComponent } from './../notify-panel/notify-panel.component';
import { DataInvitationsService } from './../shared/data/data-invitations.service';
import { DataFriendsService } from './../shared/data/data-friends.service';
import { DialogFindfriendComponent } from './../dialog-findfriend/dialog-findfriend.component';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { StorageService } from '../service/storage.service';
import { GetUserService } from '../service/get-user.service';
import { ContactService } from './../service/contact.service';
import { NotifyService } from './../service/notify.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageModel } from '../shared/model/message.model';
import { RoomModel } from '../shared/model/room.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public matSnackBar: MatSnackBar,
    private storageService: StorageService,
    private userService: GetUserService,
    private chatService: ChatService,
    private dataChatService: DataChatService,
    private contactServiec: ContactService,
    private dataFriendsService: DataFriendsService,
    private dataInvitationsService: DataInvitationsService,
    private notifyService: NotifyService,
    private dbLocal: DbLocalService
  ) {}
  userName = this.storageService.get('userName');
  userId = this.storageService.get('userId');
  avatarUrl = this.storageService.get('avt');
  dataUser: any;
  notifyChat: number;
  notifyFriend: number;
  notifyInvitations: number;
  currentComponent = 'chat';
  isShowContentChat = false;

  async ngOnInit(): Promise<void> {
    Promise.all([
      this.contactServiec
        .getListFriends({
          id: this.userId,
        })
        .then((value) => {
          this.dataFriendsService.changeList(value['Items']);
        }),
      this.contactServiec
        .getListInvitations({
          id: this.userId,
        })
        .then((value) => {
          this.dataInvitationsService.changeList(value['Items']);
          this.dataInvitationsService.changeNumber(value['Count']);
        }),
      this.chatService
        .getListRoomChat({
          userid: this.userId,
        })
        .then((room) => {
          room['Items'].forEach((room) => {
            this.notifyService.joinRom(room.roomid);
            Promise.all([
              this.chatService
                .getMemberInRoom({ member: room.member.join() })
                .then((res) => {
                  if (room.hasOwnProperty('roomname')) {
                    this.dbLocal.RoomObject[room.roomid] = new RoomModel(
                      room.roomid,
                      room.roomtype,
                      res.Items,
                      room.roomname,
                      this.userId
                    );
                  } else {
                    this.dbLocal.RoomObject[room.roomid] = new RoomModel(
                      room.roomid,
                      room.roomtype,
                      res.Items,
                      '',
                      this.userId
                    );
                  }
                }),
            ]).then(() => {
              this.dbLocal.getAllRoom().then((listRoom) => {
                this.dataChatService.changeListRoom(listRoom);
              });
            });
          });
        }),
    ])
      .then(() => {
        console.log(this.dbLocal.RoomObject);
      })
      .catch((reason) => {
        console.log(reason);
      });

    this.dataChatService.currentIsShowContentChat.subscribe((value) => {
      this.isShowContentChat = value;
    });

    this.dataInvitationsService.currentNumber.subscribe((data) => {
      this.notifyInvitations = data;
    });

    this.storageService.isUpdata.subscribe(() => {
      this.userName = this.storageService.get('userName');
    });

    this.notifyService.connectNotify(this.userId);

    this.notifyService.listenMessage().subscribe((data) => {
      this.dataChatService.changStateMessage(true);
      this.dbLocal.addMessage(
        data['PK'],
        new MessageModel(
          data['PK'],
          data['SK'],
          data['owner'],
          data['time'],
          data['username'],
          data['avt'],
          data['message']
        )
      );
    });

    this.notifyService.listenNotify().subscribe((data) => {
      this.preLoadInvitation();
      this.openNotifyPanel(data);
    });
    this.notifyService.listenAccept().subscribe((data) => {
      this.preLoadInvitation();
      this.openNotifyPanel(data);
    });

    this.notifyService.listenDelete().subscribe(() => {
      this.preLoadContact();
    });
  }

  async preLoadContact() {
    const resultI = await this.contactServiec.getListFriends({
      id: this.userId,
    });
    this.dataFriendsService.changeList(resultI.Items);
  }
  async preLoadInvitation() {
    const resultI = await this.contactServiec.getListInvitations({
      id: this.userId,
    });
    this.dataInvitationsService.changeNumber(resultI.Count);
    this.dataInvitationsService.changeList(resultI.Items);
  }

  goToChat() {
    this.currentComponent = 'chat';
    this.dataChatService.changeIsShow(false);
  }
  goToContact() {
    this.currentComponent = 'contact';
    this.dataChatService.changeIsShow(false);
  }
  goToAddFriend() {
    this.currentComponent = 'invitations';
    this.dataChatService.changeIsShow(false);
  }

  async getCurrentUserInfo() {
    let res = await this.userService.getUserInfo(this.userId);
    if (res) {
      this.dataUser = res.Item;
    }
  }

  openNotifyPanel(data) {
    this.matSnackBar.openFromComponent(NotifyPanelComponent, {
      data: data,
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['notify'],
    });
  }

  async openDialog() {
    await this.getCurrentUserInfo();
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '450px',
      data: { dataUser: this.dataUser },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  openFindFriendDialog() {
    const dialogFindFriend = this.dialog.open(DialogFindfriendComponent, {
      width: '350px',
    });
  }
  async getBoxChat(itemBoxChat) {
    this.isShowContentChat = true;
    const listBoxChat = this.chatService.getListRoom(itemBoxChat);
    console.log(listBoxChat);
  }
  logOut() {
    this.storageService.removeAll();
    this.dbLocal.RoomObject = {};
    this.dbLocal.UserObject = {};
    this.dataChatService.changeListRoom([]);
    this.router.navigate(['./login']);
  }
}
