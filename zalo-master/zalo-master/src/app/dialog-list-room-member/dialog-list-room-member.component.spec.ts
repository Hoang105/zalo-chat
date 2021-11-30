import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListRoomMemberComponent } from './dialog-list-room-member.component';

describe('DialogListRoomMemberComponent', () => {
  let component: DialogListRoomMemberComponent;
  let fixture: ComponentFixture<DialogListRoomMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogListRoomMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListRoomMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
