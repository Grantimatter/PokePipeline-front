import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonUtilityModule } from '../../pokemon-utility.module';

/**
 * @classdesc Service used to handle various Pokémon related validation
 * @property isValidPokemonId {@link isValidPokemonId}
 * @class
 */
@Injectable({
  providedIn: PokemonUtilityModule
})
export class PokemonService {

  constructor() { }

  /**
   * @method isValidPokemonId
   * All calls to get Pokémon from PokéAPI should be validated here first
   * @param {number} id - The Pokédex index of the Pokémon
   * @return {boolean} Returns true if the id is a valid Pokémon
   */
  isValidPokemonId(id: number): boolean {
    if(id == 132 || id < 1 || id > 807 ){
      console.log("Invalid Pokemon ID! Try another one!");
      return false;
    }

    return true;
  }

  /** 
   * Checks the pokemon to make sure it is valid for use anywhere in the application
   * @param {Pokemon} pokemon - The Pokémon to be checked
   */
  isValidPokemon(pokemon:any): boolean {
    if(!this.isValidPokemonId(pokemon.id)) return false;
    if(pokemon.moves.length < 2){
      console.log("Pokemon is invalid due to not having any moves");
      return false;
    }
    if(!pokemon.sprites || !pokemon.sprites.other["official-artwork"] || !pokemon.sprites.other["official-artwork"].front_default || !pokemon.sprites.front_default || !pokemon.sprites.back_default) return false;
    
    return true;
  }
  
  /**
   * Checks the pokemon to make sure it is a valid starter 
   * @param {Pokemon} pokemon - The Pokémon to be checked
   * @param {any} species - The detailed species info of the Pokémon
   * @returns {boolean} Returns validaty of pokemon as a starter
   */
  isValidStarter(pokemon: Pokemon, species: any): boolean {
    if (!this.isValidPokemon(pokemon)) return false;
    if (species.is_mythical || species.is_legendary) return false;

    return true;
  }

  /**
   * Checks the pokemon to make sure it is a valid starter 
   * @param {species} species - The detailed species info of the Pokémon
   * @returns {boolean} Returns true if Pokémon is the first evolution, or if the previous evolution is a baby
   */
  isFirstEvolution(species: any): boolean {
    if (species.evolves_from_species) {
      if (!species.evolves_from_species.is_baby) {
        return false;
      }
    }

    return true;
  }
}
