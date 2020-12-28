import { TestBed } from '@angular/core/testing';

import { GetPokemonAPIService } from './get-pokemon-api.service';

describe('GetPokemonAPIService', () => {
  let service: GetPokemonAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPokemonAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
