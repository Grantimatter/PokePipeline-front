import { TestBed } from '@angular/core/testing';

import { BasicValidationService } from './basic-validation.service';

describe('BasicValidationService', () => {
  let service: BasicValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
