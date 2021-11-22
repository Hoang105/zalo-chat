import { NotifyService } from './../service/notify.service';
import { DataInvitationsService } from './../shared/data/data-invitations.service';
import { DialogAddFriendComponent } from './../dialog-add-friend/dialog-add-friend.component';
import { ContactService } from './../service/contact.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface obj {
  idYeuCauKetBan: string;
  idDongYKetBan: string;
}
@Component({
  selector: 'app-list-item-invitations',
  templateUrl: './list-item-invitations.component.html',
  styleUrls: ['./list-item-invitations.component.scss'],
})
export class ListItemInvitationsComponent implements OnInit {
  constructor(
    private contactServiec: ContactService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dataInvitationsService: DataInvitationsService,
    private notifyService: NotifyService
  ) {}
  listinvitions = [];
  selectedOptions: any;
  id = '';
  oldNotify = 0;

  ngOnInit(): void {
    this.dataInvitationsService.currentListI.subscribe((list) => {
      this.listinvitions = list;
    });
    //this.listinvitions = this.dataInvitationsService.getList();
    // this.getListFriendInvitations();
  }

  async getListFriendInvitations(): Promise<any> {
    const id = this.storageService.get('userId');
    const result = await this.contactServiec.getListInvitations({ id: id });
    this.dataInvitationsService.changeNumber(result.Count);
    this.dataInvitationsService.changeList(result.Items);
  }

  showinfo() {
    const dialogRef = this.dialog.open(DialogAddFriendComponent, {
      width: '350px',
      data: { dataUser: this.selectedOptions[0] },
    });
    let obj: obj = {
      idYeuCauKetBan: this.selectedOptions[0].userid,
      idDongYKetBan: this.storageService.get('userId'),
    };
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.showMessage('Đang xử lý', 2000);
        this.contactServiec.acceptFriend(obj).then((value) => {
          this.getListFriendInvitations();
          this.apceptLoimoi();
          this.showMessage('Đã là bạn bè', 3000);
        });
      } else if (result == 'false') {
        this.showMessage('Đang xử lý', 2000);
        this.contactServiec.denyFriend(obj).then((value) => {
          this.getListFriendInvitations();
          this.showMessage('Đã từ chối kết bạn', 3000);
        });
      }
    });
  }
  showMessage(result, time) {
    this.snackBar.open(result, '', {
      duration: time,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['center'],
    });
  }

  apceptLoimoi() {
    let idreceiver = this.selectedOptions[0].userid;
    let modelNotify = {
      idsender: this.storageService.get('userId'),
      username: this.storageService.get('userName'),
      avt: this.storageService.get('avt'),
      message: 'vừa đồng ý lời mời kết bạn',
    };
    this.notifyService.sendAccept(idreceiver, modelNotify);
  }
}
