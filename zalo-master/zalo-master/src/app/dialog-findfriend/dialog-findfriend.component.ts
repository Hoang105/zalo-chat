import { NotifyService } from './../service/notify.service';
import { Component, OnInit } from '@angular/core';
import { ContactService } from './../service/contact.service';
import { StorageService } from '../service/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

export interface findModel {
  id: string;
  idfind: string;
}

@Component({
  selector: 'app-dialog-findfriend',
  templateUrl: './dialog-findfriend.component.html',
  styleUrls: ['./dialog-findfriend.component.scss'],
})
export class DialogFindfriendComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogFindfriendComponent>,
    private storageService: StorageService,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {}
  userid = '';
  dataUser = {
    userid: '',
    username: '',
    birthday: '',
    gender: '',
    imgurl: '',
    isfriend: false,
  };
  regx = new RegExp('^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$');
  isShowErrPhoneNumber = false;
  ishowInfo = false;
  isShowNoDataFound = false;
  isShowProcess = false;

  async findid() {
    this.isShowProcess = true;
    let model = {
      id: this.storageService.get('userId'),
      idfind: this.userid,
    };

    if (this.regx.test(this.userid)) {
      this.isShowErrPhoneNumber = false;
      let res = await this.contactService.findFriend(model);
      if (res.Count == 0) {
        this.isShowNoDataFound = true;
      }
      this.dataUser = res.Items[0];
      if (res.isfriend) {
        this.dataUser.isfriend = false;
      } else {
        this.dataUser.isfriend = true;
      }
      this.ishowInfo = true;
      this.isShowProcess = false;
    } else {
      this.isShowProcess = false;
      this.isShowErrPhoneNumber = true;
      this.userid = '';
    }
  }
  async sendLoimoi() {
    let model = {
      idsender: this.storageService.get('userId'),
      idreceiver: this.dataUser.userid,
    };
    let idreceiver = this.dataUser.userid;
    let modelNotify = {
      idsender: this.storageService.get('userId'),
      username: this.storageService.get('userName'),
      avt: this.storageService.get('avt'),
      message: 'vừa gửi lời mời kết bạn',
    };
    let res = await this.contactService.sendFriendInvitions(model);
    if (res.message) {
      this.snackBar.open(res.message, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['center'],
      });

      this.notifyService.sendNotifyInvitations(idreceiver, modelNotify);
      this.dialogRef.close();
    }
  }
}
