import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '../service/contact.service';
import { GetUserService } from '../service/get-user.service';
import { NotifyService } from '../service/notify.service';
import { StorageService } from '../service/storage.service';
import { DataFriendsService } from '../shared/data/data-friends.service';

@Component({
  selector: 'app-dialog-list-room-member',
  templateUrl: './dialog-list-room-member.component.html',
  styleUrls: ['./dialog-list-room-member.component.scss'],
})
export class DialogListRoomMemberComponent implements OnInit {
  listMember: any = [];
  userId: string;
  constructor(
    private dataFriendsService: DataFriendsService,
    private storageService: StorageService,
    private contactServiec: ContactService,
    private dialogRef: MatDialogRef<DialogListRoomMemberComponent>,
    private userService: GetUserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifyService: NotifyService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = this.storageService.get('userId');
    let user;
    this.data.roomMember.forEach(async (element) => {
      user = await this.userService.getUserInfo(element);
      this.listMember.push(user.Item);
    });
  }
  async deleteMember(member): Promise<void> {
    if (this.userId !== this.data.leadId) {
      console.log('Bạn không có quyền xoá');
      return;
    }
    this.data.roomMember.splice(
      this.data.roomMember.findIndex((x) => x === member),
      1
    );
    let modal = {
      pk: this.data.PK,
      sk: this.data.SK,
      idIsDeleted: member,
    };
    const data = await this.contactServiec.editRoomChat(modal);
    this.notifyService.sendNewGroup(member);
    this.dialogRef.close(data);
  }
}
