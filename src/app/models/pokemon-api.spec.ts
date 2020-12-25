import { PokemonAPI } from './pokemon-api';

describe('PokemonAPI', () => {
  it('should create an instance', () => {
    expect(new PokemonAPI()).toBeTruthy();
  });
});
