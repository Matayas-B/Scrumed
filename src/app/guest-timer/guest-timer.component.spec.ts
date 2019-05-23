import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTimerComponent } from './guest-timer.component';

describe('TimerComponent', () => {
  let component: GuestTimerComponent;
  let fixture: ComponentFixture<GuestTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
