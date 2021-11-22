import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemInvitationsComponent } from './list-item-invitations.component';

describe('ListItemInvitationsComponent', () => {
  let component: ListItemInvitationsComponent;
  let fixture: ComponentFixture<ListItemInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemInvitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
