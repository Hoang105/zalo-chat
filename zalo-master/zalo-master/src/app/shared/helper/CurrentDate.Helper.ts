import { DatePipe } from '@angular/common';

export class CurrentDate {
  static getCurrentDate() {
    let datePipe = new DatePipe('en-US');
    let myOutDate: string = '';
    myOutDate = datePipe.transform(new Date(), 'yyyyMMddhhmmssSSS');
    return myOutDate;
  }

  static getCurrentTime() {
    let datePipe = new DatePipe('en-US');
    let myOutDate: string = '';
    myOutDate = datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss.SSS');
    return myOutDate;
  }
}
