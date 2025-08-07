import { TestBed } from '@angular/core/testing';

import { TeaDataService } from './tea-data.service';

describe('TeaDataService', () => {
  let service: TeaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
