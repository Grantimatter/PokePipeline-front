import { TestBed } from '@angular/core/testing';
import { PokeDatabaseService } from './poke-database.service';


describe('PokeDatabaseService', () => {
  let service: PokeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
