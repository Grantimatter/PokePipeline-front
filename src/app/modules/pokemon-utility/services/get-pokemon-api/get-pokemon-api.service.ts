import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, combineLatest, concat, of } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { PokemonUtilityModule } from '../../pokemon-utility.module';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Pokemon } from 'src/app/models/pokemon';
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
   * @param {number} id - The Pokedex index of the Pokémon.
   */
  getPokemonFromAPI(id: number): Observable<Pokemon> {
    return this.httpClient.get(`${environment.apiUrl}/pokemon/${id}/`) as Observable<Pokemon>;
  }

  /**
   * Retrieves a list of all moves belonging to the Pokémon.
   * @param {Observable<any>} pokemon - The Pokédex index of the Pokémon.
   */
  getAllMovesFromPokemonAPI(pokemon: Observable<Pokemon>): Observable<any> {
    return combineLatest([pokemon]).pipe(
      map((resp) => {
        let newMoves: any[] = [];
        for (const move of resp[0]["moves"]) {
          newMoves.push(this.httpClient.get(move["move"]["url"]));
        }
        return forkJoin(newMoves);
      }),
      concatAll()
    );
  }

  /**
   * Retrieves a Pokémon with detailed moves from PokéAPI with the given Pokédex index.
   * @param {number} id - The Pokédex index of the Pokémon.
   */
  getPokemonWithAllMovesAPI(id: number): Observable<any> {
    const pokemon = this.getPokemonFromAPI(id);
    const moves = this.getAllMovesFromPokemonAPI(pokemon);
    return combineLatest([pokemon, moves]).pipe(
      map(([pokemon, moves]) => {
        if(moves[1] == null) return null;
        pokemon.moves = moves;
        return pokemon;
      })
    ) as Observable<any>;
  }

  /**
   * Get detailed species information from API
   * @param {number} id - The Pokédex index of the Pokémon.
   * @returns {Observable<any>} - returns an observable
   */
  getSpeciesFromPokemonAPI(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/pokemon-species/${id}`) as Observable<any>;
  }

  getSpeciesFromPokemonAPIUrl(url: string): Observable<any> {
    return this.httpClient.get(url) as Observable<any>;
  }

  getEvolutionFromSpeciesAPI(species:Observable<any>):Observable<any>{
    return combineLatest([species]).pipe(
      map((resp)=>{
        if(resp[0]["evolves_from_species"]){
          return this.httpClient.get(resp[0]["evolves_from_species"]["url"]);
        }else{
          console.log(resp[0]["name"] + " does not evolve");
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
  getPokemonSpeciesAndEvolutionChainAPI(id: number):Observable<any>{
    const species:Observable<any> = this.getSpeciesFromPokemonAPI(id);
    const evolves_from_species:Observable<any> = this.getEvolutionFromSpeciesAPI(species);

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
  getPokemonWithSpeciesAndMovesFromAPI(id: number):Observable<any>{
    const pokemon:Observable<any> = this.getPokemonWithAllMovesAPI(id);
    const species:Observable<any> = this.getPokemonSpeciesAndEvolutionChainAPI(id);

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
  getFirstEvolutionFromPokemonIdAPI(evolves_from_species:any):Observable<Pokemon>{
    return null;
  }
}
