import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { PokemonUtilityModule } from '../../pokemon-utility.module';
import { GetPokemonAPIService } from '../get-pokemon-api/get-pokemon-api.service';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable({
  providedIn: PokemonUtilityModule
})
export class PokeApiHelperService {

  constructor(
    private pokemonService:PokemonService,
    private getPokemonService:GetPokemonAPIService,
    private utilityService:UtilityService
    ) { }
    
  /**
   * Retrieves a Pokémon based on 'input' and sets the value of 'pokemon'.
   * @param {number} id - The Pokedex index of the Pokémon.
   * @param {Function} onSuccess - A callback function to 
   */
  getPokemonAPI(id:number, onSuccess: (pokemon:Pokemon) => void, onFail? :() => void): void {
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonFromAPI(id).subscribe(
        (pokemonData: Pokemon) => {
          onSuccess(pokemonData);
        },
        () => {
          onFail();
        });
    }
  }

  /**
   * Sets starterPokemon to a randomly selected starter Pokémon.
   */
  getValidStarterPokemon(onSuccess: (pokemon:Pokemon) => void): void {
    let id = this.utilityService.getRandomInt(1, 806);
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
        (resp: any) => {
          if (this.pokemonService.isValidStarter(resp, resp["species"])) {
            if (this.pokemonService.isFirstEvolution(resp["species"])) {
              onSuccess(resp);
              console.log(resp.name + " is a valid starter Pokémon!");
            } else {
              console.log(resp.name + " is valid as a starter but is not the first evolution!");
              this.getFirstEvolutionFromPokemon(resp, onSuccess);
            }
          } else {
            this.getValidStarterPokemon(onSuccess);
            console.log(resp.name + " is not a valid starter type.");
          }
        }
      );
    }
  }

  getFirstEvolutionFromPokemon(pokemon: any, x: (pokemon:Pokemon) => void): void {
    this.getPokemonService.getFirstEvolutionFromPokemonIdAPI(pokemon.species.evolves_from_species).subscribe(
      (resp) => {
        x(resp);
      }
    );
  }

  getPokemonWithAllMovesAPI(id:number, x: (pokemon:Pokemon) => void): void {
    // Check input for valid ID before wasting a call to the API on an invalid ID
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
        (pokemonData: Pokemon) => {
          if (this.pokemonService.isValidPokemon(pokemonData)) {
            x(pokemonData);
          } else {
            x(null);
          }
        },
        () => {
          console.log("Failed to get Pokemon with moves");
        });
    }
  }
}
