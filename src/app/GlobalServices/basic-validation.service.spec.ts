import { TestBed, ComponentFixture } from '@angular/core/testing';

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

  it('should evaluate to true', () => {
    expect(service.isTruthyString('truthy')).toBeTruthy();
  });

  it('should evaluate to false', () =>
    expect(
      service.isTruthyString('') ||
        service.isTruthyString(null) ||
        service.isTruthyString(undefined)
    ).toBeFalsy());

  it('should evaluate to true', () =>
    expect(service.isTruthyObject({})).toBeTruthy());

  it('should evaluate to false', () =>
    expect(
      service.isTruthyObject(null) ||
        service.isTruthyObject(null) ||
        service.isTruthyObject(undefined)
    ).toBeFalsy());
});
