import { Injectable } from '@angular/core';
import { Type } from 'src/app/models/enums/type.enum';
import { Move } from 'src/app/models/move/move';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { PokemonUtilityModule } from '../../pokemon-utility.module';
import { environment } from 'src/environments/environment';

/**
 * @classdesc Service used to handle various Pokémon related validation
 * @property isValidPokemonId {@link isValidPokemonId}
 * @class
 */
@Injectable({
  providedIn: PokemonUtilityModule
})
export class PokemonService {

  constructor(private utilityService: UtilityService) { }

  /**
   * Input a Pokemon and watch a fully formed Pokemon emerge with selected moves.
   * @param {JSON} pokemonWithAllMovesJSON - The Pokemon JSON object from the API with detailed move information.
   * @returns {Pokemon} Returns a valid useable Pokemon with 4 random moves assigned to it.
   */
  createNewPokemonWithRandomMoves(pokemonWithAllMovesJSON: JSON): Pokemon {
    let pokemon: Pokemon = new Pokemon(pokemonWithAllMovesJSON);
    pokemon.moves = this.selectMovesForPokemon(pokemonWithAllMovesJSON["moves"], pokemon.types);
    pokemon.setLevel(1);
    return pokemon;
  }

  /**
   * Selects 4 random moves to apply to 
   * @param {JSON} detailedMovesJSON The Move's JSON response from PokeAPI.
   * @param {Type} pokemonType - The Pokemon's types.
   */
  selectMovesForPokemon(detailedMovesJSON: JSON, pokemonTypes: Type[]): Move[] {
    let moves: Move[] = [];
    let moveCount = Object.keys(detailedMovesJSON).length;

    // Apply all moves if there aren't more than 4
    if (moveCount <= 4) {
      for (let i = 0; i < moveCount; i++) {
        let move: Move = new Move(detailedMovesJSON[i]);
        if (!this.doesMoveExist(move, moves) && this.isValidMove(detailedMovesJSON[i])) {
          moves.push(move)
        }
      }
    }

    // Apply the first two moves at random
    for (let i = 0; i < 2; i++) {
      do {
        //console.log("Choosing first 2 moves!");
        let x = this.utilityService.getRandomInt(0, moveCount - 1);
        let move: Move = new Move(detailedMovesJSON[x]);
        //console.dir(`Selected Move # ${x} and it is...`, move);
        if (!this.doesMoveExist(move, moves) && this.isValidMove(detailedMovesJSON[x])) {
          moves.push(move);
        }
      } while (moves.length < 2)
    }
    // Apply next 2 moves of the single-type Pokemon making sure they are the same type
    if (pokemonTypes.length == 1) {
      console.debug("Choosing last 2 moves of single-type");
      do {
        let x = this.utilityService.getRandomInt(0, moveCount - 1);
        let move: Move = new Move(detailedMovesJSON[x]);
        if (!this.doesMoveExist(move, moves) && this.isValidMove(detailedMovesJSON[x], pokemonTypes[0])) {
          moves.push(move);
        }
      } while (moves.length < 4)
      // Apply next 2 moves of dual-type pokemon making sure there is at least one of each type
    } else {
      for (let i = 0; i < 2; i++) {
        console.debug("Choosing last 2 moves of dual-type");
        do {
          let x = this.utilityService.getRandomInt(0, moveCount - 1);
          let move: Move = new Move(detailedMovesJSON[x]);
          if (!this.doesMoveExist(move, moves) && this.isValidMove(detailedMovesJSON[x], pokemonTypes[i])) {
            moves.push(move);
          }
        } while (moves.length < 3 + i)
      }
    }

    return moves;
  }

  doesMoveExist(move:Move, moves:Move[]): boolean {
    for(let m of moves){
      if(m.id == move.id){
        return true;
      }
    }
    return false;
  }

  /**
   * Determines if the given move is valid for the specified pokemon type
   * @param moveJSON 
   * @param pokemonTypes 
   */
  isValidMove(moveJSON: JSON, type?: Type): boolean {
    let move: Move = new Move(moveJSON);
    if (!move.power || move.power <= 0) {
      return false;
    }
    if (move.damage_class.toUpperCase() != "PHYSICAL" && move.damage_class.toUpperCase() != "SPECIAL") {
      return false;
    }
    if (type && type.toString() != move.type.toString()) {
      return false
    }
    return true;
  }

  /**
   * @method isValidPokemonId
   * All calls to get Pokémon from PokéAPI should be validated here first
   * @param {number} id - The Pokédex index of the Pokémon
   * @return {boolean} Returns true if the id is a valid Pokémon
   */
  isValidPokemonId(id: number): boolean {
    if (id < 1 || id == 132 || id == 555 || id >= environment.pokemonRange) {
      console.log("Invalid Pokemon ID! Try another one!");
      return false;
    }

    return true;
  }

  /** 
   * Checks the pokemon to make sure it is valid for use anywhere in the application
   * @param {Pokemon} pokemon - The Pokémon to be checked
   */
  isValidPokemon(pokemon: any): boolean {
    if (!this.isValidPokemonId(pokemon.id)) return false;
    if (pokemon.moves.length < 2) {
      console.log("Pokemon is invalid due to not having any moves");
      return false;
    }
    if (!pokemon.sprites || !pokemon.sprites.other["official-artwork"] || !pokemon.sprites.other["official-artwork"].front_default || !pokemon.sprites.front_default || !pokemon.sprites.back_default || !pokemon.sprites.front_shiny || !pokemon.sprites.back_shiny) return false;

    return true;
  }

  /**
   * Checks the pokemon to make sure it is a valid starter 
   * @param {Pokemon} pokemon - The Pokémon to be checked
   * @param {any} species - The detailed species info of the Pokémon
   * @returns {boolean} Returns validaty of pokemon as a starter
   */
  isValidStarter(pokemon: JSON, species: JSON): boolean {
    if (!this.isValidPokemon(pokemon)) return false;
    if (species["is_mythical"] || species["is_legendary"]) return false;

    return true;
  }

  /**
   * Checks the pokemon to make sure it is a valid starter 
   * @param {species} species - The detailed species info of the Pokémon
   * @returns {boolean} Returns true if Pokémon is the first evolution, or if the previous evolution is a baby
   */
  isFirstEvolution(species: JSON): boolean {
    if (species["evolves_from_species"]) {
      if (!species["evolves_from_species"]["is_baby"]) {
        return false;
      }
    }

    return true;
  }
}
