import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializeScrumComponent } from './initialize-scrum.component';

describe('InitializeScrumComponent', () => {
  let component: InitializeScrumComponent;
  let fixture: ComponentFixture<InitializeScrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitializeScrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitializeScrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
