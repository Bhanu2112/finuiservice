import { TestBed } from '@angular/core/testing';

import { SplitserviceService } from './splitservice.service';

describe('SplitserviceService', () => {
  let service: SplitserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
