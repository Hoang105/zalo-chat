import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFindfriendComponent } from './dialog-findfriend.component';

describe('DialogFindfriendComponent', () => {
  let component: DialogFindfriendComponent;
  let fixture: ComponentFixture<DialogFindfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFindfriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFindfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
