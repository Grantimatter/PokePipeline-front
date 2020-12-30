import { TestBed } from '@angular/core/testing';

import { PokeApiHelperService } from './poke-api-helper.service';

describe('PokeApiHelperService', () => {
  let service: PokeApiHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeApiHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
