import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemContactComponent } from './list-item-contact.component';

describe('ListItemContactComponent', () => {
  let component: ListItemContactComponent;
  let fixture: ComponentFixture<ListItemContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
