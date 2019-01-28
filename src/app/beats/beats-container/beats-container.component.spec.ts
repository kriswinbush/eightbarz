import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatsContainerComponent } from './beats-container.component';

describe('BeatsContainerComponent', () => {
  let component: BeatsContainerComponent;
  let fixture: ComponentFixture<BeatsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
