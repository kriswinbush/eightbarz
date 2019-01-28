import { TestBed, inject } from '@angular/core/testing';

import { DawControlsService } from './daw-controls.service';

describe('DawControlsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DawControlsService]
    });
  });

  it('should be created', inject([DawControlsService], (service: DawControlsService) => {
    expect(service).toBeTruthy();
  }));
});
