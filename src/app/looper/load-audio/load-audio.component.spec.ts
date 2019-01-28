import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAudioComponent } from './load-audio.component';

describe('LoadAudioComponent', () => {
  let component: LoadAudioComponent;
  let fixture: ComponentFixture<LoadAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
