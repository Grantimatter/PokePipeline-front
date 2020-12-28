import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap} from 'rxjs/operators';
import { PokemonAPI } from '../models/pokemon-api';

@Injectable({
  providedIn: 'root'
})
export class GetPokemonAPIService {

  constructor(private httpClient:HttpClient) { }

  getPokemonFromAPI(id:number):Observable<PokemonAPI> {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`) as Observable<PokemonAPI>;
  }
  
  // Returns an observable of all moves that a pokemon is capable of knowing
  getPokemonMoves(id:number):Observable<any>{
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).pipe(
      mergeMap((pokemon:any)=>{
        const moves:Observable<any>[] = [];
        for(let move in pokemon.moves){
          moves.push(this.httpClient.get(pokemon.moves[move].move.url));
        }
        return forkJoin(moves);
      })
    ) as Observable<any>;
  }

}
