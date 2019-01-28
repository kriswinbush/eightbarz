import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallabContainerComponent } from './callab-container.component';

describe('CallabContainerComponent', () => {
  let component: CallabContainerComponent;
  let fixture: ComponentFixture<CallabContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallabContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
