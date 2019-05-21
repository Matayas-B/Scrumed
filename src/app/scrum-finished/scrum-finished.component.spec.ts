import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumFinishedComponent } from './scrum-finished.component';

describe('ScrumFinishedComponent', () => {
  let component: ScrumFinishedComponent;
  let fixture: ComponentFixture<ScrumFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
