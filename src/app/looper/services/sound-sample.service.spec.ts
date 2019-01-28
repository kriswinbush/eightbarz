import { TestBed } from '@angular/core/testing';

import { SoundSampleService } from './sound-sample.service';

describe('SoundSampleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundSampleService = TestBed.get(SoundSampleService);
    expect(service).toBeTruthy();
  });
});
