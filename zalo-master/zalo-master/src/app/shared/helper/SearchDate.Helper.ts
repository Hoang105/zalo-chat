import { DatePipe } from '@angular/common';

export class SearchDate {
  static formatDateNoTime(date: any) {
    let datePipe = new DatePipe('en-US');
    let myOutDate: string = '';
    myOutDate = datePipe.transform(date, 'yyyy/MM/dd');
    return myOutDate;
  }
}
