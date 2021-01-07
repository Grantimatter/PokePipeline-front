import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeDatabaseService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Inserts Pokemon into the database.
   * @param pokemon The pokemon to be added into the database
   */
  addPokemonToParty(pokemon: Pokemon): void { // not working yet
    this.httpClient.post(`${environment.ec2Url}/pokemon`, pokemon, {
      withCredentials: true
    }).subscribe(
      (resp)=>{
        console.debug("Pokemon added successfully!", resp);
      },
      (error)=>{
        console.warn("Pokemon was not added to database due to the following exception", error);
      }
    );
  }

  /**
   * Call when you would like to kill a pokemon
   * @param {Pokemon} pokemon - The Pokemon you would like to kill
   * @param {Function} onSuccess - The callback function to use when the pokemon is deleted
   */
  killPokemon(pokemon: Pokemon, onSuccess: ()=>void) {
    this.httpClient.delete(`${environment.ec2Url}/pokemon`, {
      withCredentials: true
    }).subscribe(
      (resp)=>{
        console.debug("Pokemon deleted!");
      },
      (error)=>{
        console.warn("Failed to delete pokemon");
      }
    );
  }
}
