import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { environment } from 'src/environments/environment';
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
   * @param {number} id - The Pokédex index of the Pokémon.
   * @param {Function} onSuccess - The callback function to invoke whenever a pokemon object is received.
   * @param {Function} onFail - The callback function to invoke on failure to retrieve the requested Pokémon
   */
  getPokemonAPI(id:number, onSuccess: (pokemon:JSON) => void, onFail? :() => void): void {
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonFromAPI(id).subscribe(
        (resp) => {
          onSuccess(resp);
        },
        () => {
          onFail();
        });
    }
  }

  /**
   * Sets starterPokemon to a randomly selected starter Pokémon.
   * @param {Function} onSuccess - The method to invoke when a starter Pokémon is retrieved.
   */
  getValidStarterPokemon(onSuccess: (pokemon:JSON) => void): void {
    let id = this.utilityService.getRandomInt(1, environment.pokemonRange);
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
        (resp) => {
          if (this.pokemonService.isValidStarter(resp, resp["species"])) {
            if (this.pokemonService.isFirstEvolution(resp["species"])) {
              onSuccess(resp);
            } else {
              this.getFirstEvolutionFromPokemon(resp, onSuccess);
            }
          } else {
            this.getValidStarterPokemon(onSuccess);
          }
        }
      );
    }
  }

  /**
   * Gets a random valid Pokémon with detailed moves and sends it through the callback function provided
   * @param {Function} onSuccess - The method to invoke when a starter Pokémon is retrieved.
   */
  getRandomValidPokemon(onSuccess: (pokemon:JSON) => void): void {
    let id = this.utilityService.getRandomInt(1, environment.pokemonRange);
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonWithAllMovesAPI(id, onSuccess, ()=>console.warn("Failed to retrieve radom valid pokemon with detailed JSON"));
    }
  }

  /**
   * Retrieve the first evolution of the given pokemon
   * @param pokemon 
   * @param onSuccess 
   */
  getFirstEvolutionFromPokemon(pokemon: JSON, onSuccess: (pokemon:JSON) => void): void {
    this.getPokemonService.getFirstEvolutionFromPokemonIdAPI(pokemon["species"]["evolves_from_species"]).subscribe(
      (resp) => {
        console.debug(`Retrieved ${resp["name"]} as the first evolution of ${pokemon["name"]}`);
        onSuccess(resp);
      }
    );
  }

  /**
   * Retrieves the specified Pokémon from PokéAPI with detailed moves and invokes a callback function
   * @param id 
   * @param onSuccess 
   * @param onFail 
   */
  getPokemonWithAllMovesAPI(id:number, onSuccess: (pokemon:JSON) => void, onFail: () => void): void {
    // Check input for valid ID before wasting a call to the API on an invalid ID
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
        (pokemonData) => {
          if (this.pokemonService.isValidPokemon(pokemonData)) {
            onSuccess(pokemonData);
          } else {
            console.debug(`${pokemonData["name"]} is not a valid Pokémon!`);
            onFail();
          }
        },
        () => {
          console.error(`Error retrieving Pokémon [${id}] from PokéAPI`);
          onFail();
        });
    }
  }
}
