import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notify-panel',
  templateUrl: './notify-panel.component.html',
  styleUrls: ['./notify-panel.component.scss'],
})
export class NotifyPanelComponent implements OnInit {
  constructor(
    public snackBarRef: MatSnackBarRef<NotifyPanelComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
