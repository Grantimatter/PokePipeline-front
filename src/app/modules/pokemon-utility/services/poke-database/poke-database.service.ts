import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokeDatabaseService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Takes pokemon object and maps it to a DTO
   * @param pokemon
   */
  mapPokemonObject(pokemon: Pokemon): any {
    return {
      pokemonId: pokemon.id,
      // pokemonAPI: pokemon.api,
      currentHP: pokemon.currentHP,
      experience: pokemon.getLevel(),
      move1API: pokemon.moves[0],
      move2API: pokemon.moves[1],
      move3API: pokemon.moves[2],
      move4API: pokemon.moves[3],
    };
  }

  /**
   * Inserts Pokemon into the database.
   * @param pokemon The pokemon to be added into the database
   */
  addPokemonToParty(pokemon: Pokemon): void {
    // not working yet
    let pokemonDTO: any = pokemon;
    pokemonDTO.pokemonDTO.move1API = pokemon.moves[0];
    this.httpClient
      .post(`${environment.ec2Url}/pokemon`, this.mapPokemonObject(pokemon), {
        withCredentials: true,
      })
      .subscribe(
        (resp) => {
          console.debug('Pokemon added successfully!', resp);
        },
        (error) => {
          console.warn(
            'Pokemon was not added to database due to the following exception',
            error
          );
        }
      );
  }

  /**
   * Updates a pokemon in the database
   * @param pokemon The pokemon to be updated in the database
   * @param onSuccess Callback function to use when the update is successful
   */
  updatePokemon(pokemon: Pokemon, onSuccess: (x: any) => void): void {
    this.httpClient
      .put(`${environment.ec2Url}/pokemon`, this.mapPokemonObject(pokemon), {
        withCredentials: true,
      })
      .subscribe(
        (resp) => {
          console.debug('Pokemon updated in the database');
          onSuccess(resp);
        },
        (err) => {
          console.warn('Unable to update pokemon in database');
        }
      );
  }

  /**
   * Call when you would like to kill a pokemon
   * @param {Pokemon} pokemon - The Pokemon you would like to kill
   * @param {Function} onSuccess - The callback function to use when the pokemon is deleted
   */
  killPokemon(pokemon: Pokemon, onSuccess: () => void) {
    this.httpClient
      .delete(`${environment.ec2Url}/pokemon`, { withCredentials: true })
      .subscribe(
        (resp) => {
          console.debug('Pokemon deleted!');
          onSuccess();
        },
        (error) => {
          console.warn('Failed to delete pokemon');
        }
      );
  }
}
