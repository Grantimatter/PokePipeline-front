import { TestBed } from '@angular/core/testing';

import { Logged.Out.GuardService } from './logged.out.guard.service';

describe('Logged.Out.GuardService', () => {
  let service: Logged.Out.GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Logged.Out.GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
