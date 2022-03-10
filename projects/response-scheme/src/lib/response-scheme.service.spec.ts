import { TestBed } from '@angular/core/testing';

import { ResponseSchemeService } from './response-scheme.service';

describe('ResponseSchemeService', () => {
  let service: ResponseSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
