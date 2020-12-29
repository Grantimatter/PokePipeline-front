import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { environment } from './../../environments/environment';
import { UtilityService } from './utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class GetPokemonAPIService {

  constructor(private httpClient: HttpClient, private utilityService: UtilityService) { }

  // Get base pokemon
  getPokemonFromAPI(id: number): Observable<Pokemon> {
    return this.httpClient.get(`${environment.apiUrl}/pokemon/${id}/`) as Observable<Pokemon>;
  }

  // Use pokemon observable to insert all moves
  getAllMovesFromPokemonAPI(pokemon: Observable<Pokemon>): Observable<any> {
    return combineLatest([pokemon]).pipe(
      map((res) => {
        let newMoves: any[] = [];
        for (const move of res[0]["moves"]) {
          newMoves.push(this.httpClient.get(move["move"]["url"]));
        }
        return forkJoin(newMoves);
      }),
      concatAll()
    );
  }

  // Returns an observable pokemon that has 'moves' replaced by details of all moves that a pokemon is capable of knowing
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

  // Get detailed species information from API
  getSpeciesFromPokemonAPI(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/pokemon-species/${id}`) as Observable<any>;
  }

  getSpeciesFromPokemonAPIUrl(url: string): Observable<any> {
    return this.httpClient.get(url) as Observable<any>;
  }
}
