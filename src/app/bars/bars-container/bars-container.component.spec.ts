import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsContainerComponent } from './bars-container.component';

describe('BarsContainerComponent', () => {
  let component: BarsContainerComponent;
  let fixture: ComponentFixture<BarsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
