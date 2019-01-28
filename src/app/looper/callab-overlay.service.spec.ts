import { TestBed } from '@angular/core/testing';

import { CallabOverlayService } from './callab-overlay.service';

describe('CallabOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallabOverlayService = TestBed.get(CallabOverlayService);
    expect(service).toBeTruthy();
  });
});
