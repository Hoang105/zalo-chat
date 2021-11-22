import { StorageService } from '../service/storage.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchDate } from 'src/app/shared/helper/SearchDate.Helper';
import { UserModel } from 'src/app/shared/model/user.model';
import { GetUserService } from '../service/get-user.service';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss'],
})
export class DialogUpdateComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private userService: GetUserService,
    private dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  updateInfoFormGroup: FormGroup;
  dataUpdate: UserModel = new UserModel();
  async ngOnInit() {
    this.data.dataUser.birthday = new Date(this.data.dataUser.birthday);
  }

  async updateInfo() {
    this.dataUpdate.id = this.data.dataUser.userid;
    this.dataUpdate.username = this.data.dataUser.username;
    this.dataUpdate.birthday = SearchDate.formatDateNoTime(
      this.data.dataUser.birthday
    );
    this.dataUpdate.gender = this.data.dataUser.gender;
    this.dataUpdate.password = this.data.dataUser.password;
    let res = await this.userService.updateInfo(this.dataUpdate);
    if (res) {
      alert('Cập nhật thông tin thành công');
      this.storageService.set('userName', this.data.dataUser.username);
      this.storageService.listenUpddate();
      this.dialogRef.close();
    }
  }
}
