import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumTimerComponent } from './scrum-timer.component';

describe('ScrumTimerComponent', () => {
  let component: ScrumTimerComponent;
  let fixture: ComponentFixture<ScrumTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
