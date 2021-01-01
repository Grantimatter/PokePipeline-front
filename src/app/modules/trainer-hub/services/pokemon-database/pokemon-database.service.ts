import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { AppSettings } from 'src/app/url/app-settings';

/**
 * Interacts with the database with Pokemon objects.
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonDatabaseService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Inserts Pokemon into the database.
   * @param pokemon The pokemon to be added into the database
   */
  addPokemonToParty(pokemon:Pokemon) {
    this.httpClient.post(AppSettings.URL + "/addpokemon", pokemon);
  }

}
