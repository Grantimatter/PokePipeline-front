import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonAPI } from '../models/pokemon-api';

@Injectable({
  providedIn: 'root'
})
export class GetPokemonAPIService {

  constructor(private httpClient:HttpClient) { }

  getPokemonFromAPI(id:number):Observable<PokemonAPI> {
    return this.httpClient.get("https://pokeapi.co/api/v2/pokemon/"+id+"/") as Observable<PokemonAPI>;
  }

}
