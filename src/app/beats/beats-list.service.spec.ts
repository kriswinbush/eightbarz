import { TestBed } from '@angular/core/testing';

import { BeatsListService } from './beats-list.service';

describe('BeatsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeatsListService = TestBed.get(BeatsListService);
    expect(service).toBeTruthy();
  });
});
