import { Router } from '@angular/router';
import { LoginModel } from './../shared/model/login.model';
import { LoginService } from './../service/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { GetUserService } from '../service/get-user.service';
import { SearchDate } from '../shared/helper/SearchDate.Helper';
import { UserModel } from '../shared/model/user.model';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userService: GetUserService,

    private loginService: LoginService,
    private router: Router
  ) {}
  idFormGroup: FormGroup;
  regiterFormGroup: FormGroup;
  isLinear = true;
  isOptional = false;
  hide = true;
  registerbyemail = true;
  rgxemail = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
  rgxphone = '^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$';

  @ViewChild('stepper') stepper: MatStepper;

  dataUser: UserModel = new UserModel();
  confirmPassWord: string = '';
  loginModel: LoginModel = new LoginModel();

  ngOnInit() {
    this.idFormGroup = this._formBuilder.group({
      idFormControl: ['', Validators.required],
    });
    this.regiterFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
      confirmPassWord: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      // verificationCode: ['', Validators.required],
    });
  }

  onValChange(value: any) {
    this.registerbyemail = !this.registerbyemail;
    this.stepper.reset();
  }

  async register() {
    if (this.confirmPassWord != this.dataUser.password) {
      alert('Mật khẩu không trùng khớp, vui lòng nhập lại!');
      return;
    }
    this.dataUser.birthday = SearchDate.formatDateNoTime(
      this.dataUser.birthday
    );
    let res = await this.userService.register(this.dataUser);
    if (res.Item) {
      // alert("Bạn đã đăng ký thành công, nhấn ok để đến trang chủ");
      this.loginModel.id = res.Item.id;
      this.loginModel.password = res.Item.password;
      await this.loginService.login(this.loginModel);
      this.router.navigate(['./dashboard']);
    }
  }
}
