import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallabListComponent } from './callab-list.component';

describe('CallabListComponent', () => {
  let component: CallabListComponent;
  let fixture: ComponentFixture<CallabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
