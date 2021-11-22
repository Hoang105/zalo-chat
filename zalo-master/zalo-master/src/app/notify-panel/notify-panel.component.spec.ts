import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyPanelComponent } from './notify-panel.component';

describe('NotifyPanelComponent', () => {
  let component: NotifyPanelComponent;
  let fixture: ComponentFixture<NotifyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
