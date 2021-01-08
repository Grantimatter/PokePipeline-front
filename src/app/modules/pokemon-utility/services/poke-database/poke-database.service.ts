import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  private mapPokemonObject(pokemon: Pokemon): any {
    let anyPokemon: any = {
      pokemonId: pokemon.pokemonId,
      pokemonAPI: pokemon.pokemonAPI,
      currentHP: pokemon.currentHP,
      experience: pokemon.getLevel(),
      move1API: pokemon.moves[0]["id"],
      move2API: pokemon.moves[1]["id"],
      move3API: pokemon.moves[2]["id"],
      move4API: pokemon.moves[3]["id"]
    };
    return anyPokemon;
  }

  /**
   * Inserts Pokemon into the database.
   * @param pokemon The pokemon to be added into the database
   */
  addPokemonToParty(pokemon: Pokemon, onSucess: (x)=>void): void {
    this.httpClient.post(`${environment.ec2Url}/pokemon`, this.mapPokemonObject(pokemon), {withCredentials: true,}).subscribe(
        (resp) => {
          console.debug('Pokemon added successfully!', resp);
          onSucess(resp);
        },
        (error) => {
          console.warn('Pokemon was not added to database due to the following exception', error);
        }
      );
  }

  /**
   * Updates a pokemon in the database
   * @param pokemon The pokemon to be updated in the database
   * @param onSuccess Callback function to use when the update is successful
   */
  updatePokemon(pokemon: Pokemon, onSuccess: (x: any) => void): void {
    console.debug("Attempting to update pokemon: " + pokemon);
    this.httpClient.put(`${environment.ec2Url}/pokemon`, this.mapPokemonObject(pokemon), {withCredentials: true}).subscribe(
        (resp) => {
          console.debug('Pokemon updated in the database' + pokemon);
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
    this.httpClient.delete(`${environment.ec2Url}/pokemon/${pokemon.pokemonId}`, { withCredentials: true }).subscribe(
        (resp) => {
          console.debug('Pokemon deleted!');
          onSuccess();
        },
        (error) => {
          console.warn('Failed to delete pokemon', error);
        }
      );
  }
}
