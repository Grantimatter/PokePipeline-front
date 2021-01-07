import { TestBed } from '@angular/core/testing';

import { TypeCalculationService } from './type-calculation.service';

describe('TypeCalculationService', () => {
  let service: TypeCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
