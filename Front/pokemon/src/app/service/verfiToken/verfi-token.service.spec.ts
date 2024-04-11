import { TestBed } from '@angular/core/testing';

import { VerfiTokenService } from './verfi-token.service';

describe('VerfiTokenService', () => {
  let service: VerfiTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerfiTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
