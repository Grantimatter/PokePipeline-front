import { TestBed } from '@angular/core/testing';

import { Authentication.GuardService } from './authentication.guard.service';

describe('Authentication.GuardService', () => {
  let service: Authentication.GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authentication.GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
