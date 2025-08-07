import { TestBed } from '@angular/core/testing';

import { TeaCatalogService } from './tea-catalog.service';

describe('TeaCatalogService', () => {
  let service: TeaCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeaCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
