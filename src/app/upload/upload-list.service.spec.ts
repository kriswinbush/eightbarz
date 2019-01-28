import { TestBed } from '@angular/core/testing';

import { UploadListService } from './upload-list.service';

describe('UploadListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadListService = TestBed.get(UploadListService);
    expect(service).toBeTruthy();
  });
});
