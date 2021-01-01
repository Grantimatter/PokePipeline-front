import { TestBed } from '@angular/core/testing';

import { PokemonDatabaseService } from './pokemon-database.service';

describe('PokemonDatabaseService', () => {
  let service: PokemonDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
