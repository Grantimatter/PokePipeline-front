import { Injectable } from '@angular/core';
import { Pokemon } from '../Models/pokemon';
import { GetPokemonAPIService } from './get-pokemon-api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private getPokemonAPIService:GetPokemonAPIService) { }

  // Only choose pokemon with a valid id
  // All calls to get pokemon from the API should come through here first if(pokemonService.isValidPokemonId(pokemonId))
  isValidPokemonId(id: number): boolean {
    if(id == 132 || id < 1 || id > 807 ){
      console.log("Invalid Pokemon ID! Try another one!");
      return false;
    }

    return true;
  }
  
  isValidPokemon(pokemon:Pokemon): boolean {
    if(!this.isValidPokemonId(pokemon.id)) return false;
    if(pokemon.moves.length < 2){
      console.log("Pokemon is invalid due to not having any moves");
      return false;
    }
    return true;
  }
  
  isValidStarter(species:any): boolean{
    if(species.is_mythical || species.is_legendary) return false;
    if(species.evolves_from_species){
      this.getPokemonAPIService.getSpeciesFromPokemonAPIUrl(species.evolves_from_species.url).subscribe(
        (data)=>{
          console.log("Starter DATA: " + data);
        }
      );
    }
  }
}
