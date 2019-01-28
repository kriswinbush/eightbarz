import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatsListComponent } from './beats-list.component';

describe('BeatsListComponent', () => {
  let component: BeatsListComponent;
  let fixture: ComponentFixture<BeatsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
