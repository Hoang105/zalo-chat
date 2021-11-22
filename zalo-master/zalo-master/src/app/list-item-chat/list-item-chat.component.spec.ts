import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemChatComponent } from './list-item-chat.component';

describe('ListItemChatComponent', () => {
  let component: ListItemChatComponent;
  let fixture: ComponentFixture<ListItemChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
