export class UserChat {
  userid: string;
  username: string;
  imgurl: string;
  birthday: string;
  gender: string;
  constructor(userid, username, imgurl, birthday, gender) {
    this.userid = userid;
    this.username = username;
    this.imgurl = imgurl;
    this.birthday = birthday;
    this.gender = gender;
  }
}
