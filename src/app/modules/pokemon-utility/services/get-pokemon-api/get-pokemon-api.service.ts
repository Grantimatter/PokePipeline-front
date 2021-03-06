import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, combineLatest, of } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { PokemonUtilityModule } from '../../pokemon-utility.module';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { environment } from 'src/environments/environment';

/**
 * Service used for retrieving data from PokéAPI.
 */

@Injectable({
  providedIn: PokemonUtilityModule
})

export class GetPokemonAPIService {

  constructor(private httpClient: HttpClient, private utilityService: UtilityService) { }

  /**
   * Retrieves a Pokémon from PokéAPI with the given Pokédex index.
   * @param {number} id - The Pokédex index of the Pokémon.
   */
  getPokemonFromAPI(id: number): Observable<JSON> {
    return this.httpClient.get(`${environment.apiUrl}/pokemon/${id}/`) as Observable<JSON>;
  }

  /**
   * Retrieves a list of all moves belonging to the Pokémon.
   * @param {Observable<any>} pokemon - The Pokédex index of the Pokémon.
   */
  getAllMovesFromPokemonAPI(pokemon: Observable<JSON>): Observable<JSON> {
    return combineLatest([pokemon]).pipe(
      map((resp) => {
        let newMoves: any[] = [];
        for (const move of resp[0]["moves"]) {
          newMoves.push(this.httpClient.get(move["move"]["url"]));
        }
        return forkJoin(newMoves);
      }),
      concatAll()
    ) as Observable<JSON>;
  }

  /**
   * Retrieves a Pokémon with detailed moves from PokéAPI with the given Pokédex index.
   * @param {number} id - The Pokédex index of the Pokémon.
   */
  getPokemonWithAllMovesAPI(id: number): Observable<JSON> {
    const pokemon = this.getPokemonFromAPI(id);
    const moves = this.getAllMovesFromPokemonAPI(pokemon);
    return combineLatest([pokemon, moves]).pipe(
      map(([pokemon, moves]) => {
        if(moves[1] == null) return null;
        pokemon["moves"] = moves;
        return pokemon;
      })
    );
  }

  /**
   * Get detailed species information from API
   * @param {number} id - The Pokédex index of the Pokémon.
   * @returns {Observable<any>} - returns an observable
   */
  getSpeciesFromPokemonAPI(id: number): Observable<JSON> {
    return this.httpClient.get(`${environment.apiUrl}/pokemon-species/${id}`) as Observable<JSON>;
  }

  /**
   * 
   * @param {string} url - The url string of the species you want to receive.
   */
  getSpeciesFromPokemonAPIUrl(url: string): Observable<JSON> {
    return this.httpClient.get(url) as Observable<JSON>;
  }

  /**
   * Get the detailed evolves_from_species information from a Pokémon.
   * @param species 
   */
  getEvolvesFromSpeciesAPI(species:Observable<JSON>):Observable<JSON>{
    return combineLatest([species]).pipe(
      map((resp)=>{
        if(resp[0]["evolves_from_species"]){
          return this.httpClient.get(resp[0]["evolves_from_species"]["url"]);
        }else{
          return of(resp[0]["evolves_from_species"]);
        }
      }),
      concatAll()
    );
  }

  /**
   * Retrieves a Pokémon with detailed moves and species from PokéAPI with the given Pokédex index.
   * @param {number} id - The Pokédex index of the Pokémon.
   */
  getPokemonSpeciesAndEvolvesFromSpeciesAPI(id: number):Observable<JSON>{
    const species:Observable<JSON> = this.getSpeciesFromPokemonAPI(id);
    const evolves_from_species:Observable<JSON> = this.getEvolvesFromSpeciesAPI(species);

    return combineLatest([species, evolves_from_species]).pipe(
      map(([species, evolves_from_species])=>{
        if(evolves_from_species){
          species["evolves_from_species"] = evolves_from_species;
        }
        return species;
      })
    );
  }

  /**
   * Retrieves a Pokémon with detailed moves and species from PokéAPI with the given Pokédex index.
   * @param {number} id - The Pokédex index of the Pokémon.
   */
  getPokemonWithSpeciesAndMovesFromAPI(id: number):Observable<JSON>{
    const pokemon:Observable<JSON> = this.getPokemonWithAllMovesAPI(id);
    const species:Observable<JSON> = this.getPokemonSpeciesAndEvolvesFromSpeciesAPI(id);

    return combineLatest([pokemon, species]).pipe(
      map(([pokemon, species])=>{
        pokemon["species"] = species;
        return pokemon;
      })
    );
  }

  /**
   * Takes the evolves_from_species
   * @param {any} evolution - The detailed evolves_from_species info of the Pokémon.
   */
  getFirstEvolutionFromPokemonIdAPI(evolves_from_species:JSON):Observable<JSON>{
    const species:Observable<JSON> = this.getPokemonSpeciesAndEvolvesFromSpeciesAPI(evolves_from_species["id"]);

    return combineLatest([species]).pipe(
      map((resp)=>{
        if(!resp[0]["evolves_from_species"] || resp[0]["evolves_from_species"]["is_baby"]){
          return this.getPokemonWithAllMovesAPI(resp[0]["id"]);
        }else{
          return this.getFirstEvolutionFromPokemonIdAPI(resp[0]["evolves_from_species"]);
        }
      }),
      concatAll()
    );
  }
}
