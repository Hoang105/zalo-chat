import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFriendComponent } from './dialog-add-friend.component';

describe('DialogAddFriendComponent', () => {
  let component: DialogAddFriendComponent;
  let fixture: ComponentFixture<DialogAddFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
