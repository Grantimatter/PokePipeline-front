import { TestBed } from '@angular/core/testing';

import { AuthenticationGuardService } from './authentication.guard.service';

describe('Authentication.GuardService', () => {
  let service: AuthenticationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
