import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '../service/contact.service';
import { StorageService } from '../service/storage.service';
import { DataFriendsService } from '../shared/data/data-friends.service';

@Component({
  selector: 'app-dialog-create-group',
  templateUrl: './dialog-create-group.component.html',
  styleUrls: ['./dialog-create-group.component.scss'],
})
export class DialogCreateGroupComponent implements OnInit {
  listFriend: any;
  constructor(
    private dataFriendsService: DataFriendsService,
    private storageService: StorageService,
    private contactServiec: ContactService,
    private dialogRef: MatDialogRef<DialogCreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public create: any
  ) {}

  ngOnInit(): void {
    this.dataFriendsService.currentListFriend.subscribe((data) => {
      this.listFriend = data;
    });
  }
  async createGroup(): Promise<void> {
    const members = this.listFriend.filter((list) => list.isCheck == true);
    const roomMember = members.map((member) => member.userid);
    const roomMemberName = members.map((member) => member.username);
    const userId = this.storageService.get('userId');
    const userName = this.storageService.get('userName');
    roomMember.push(userId);
    roomMemberName.push(userName);

    const modal = {
      userId: userId,
      roomName: roomMemberName.toString(),
      roomImage: '../../assets/shiba1.jpg',
      roomNotify: '0',
      roomConversations: [],
      roomMember: roomMember,
      leaderId: userId,
      deputyTeamId: '',
      isGroup: 1,
    };
    const data = await this.contactServiec.createRoomChat(modal);
    this.dialogRef.close(data);
  }

  checkCheckBoxvalue(event, index) {
    this.listFriend[index] = {
      ...this.listFriend[index],
      isCheck: event.target.checked,
    };
  }
}
