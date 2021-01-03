import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { PokeApiHelperService } from '../../pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from '../../pokemon-utility/services/pokemon/pokemon.service';
import { PartyService } from '../../trainer-hub/services/party/party.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private pokeHelper:PokeApiHelperService, 
    private pokeService:PokemonService,
    private partyService:PartyService,
    private util:UtilityService) { 
    
  }

  public setTrainerPokemon() : Pokemon[] {
        
    let pokemon:Pokemon[] = new Array(6);
    
    /* TODO: Implement getting trainer pokemon properly
        *  this.trainer = this.partyService.getPokemon1();
        */
        
    //Generate Psyduck as trainer pokemon for testing puposes
    this.pokeHelper.getPokemonWithAllMovesAPI(54, (x:JSON)=> {
      pokemon[0] = this.pokeService.createNewPokemonWithRandomMoves(x);
      }, ()=>{return false;});

    return pokemon;
  }

  public setOpponentPokemon() : Pokemon {
    let pokemon:Pokemon;
    
    // this.pokeHelper.getPokemonWithAllMovesAPI(this.util.getRandomInt(1, 807), 
    //         (x:JSON)=> {
    //         pokemon = this.pokeService.createNewPokemonWithRandomMoves(x);
    //         }, ()=>{return false;});

    this.pokeHelper.getPokemonWithAllMovesAPI(54, 
    (x:JSON)=> {
    pokemon = this.pokeService.createNewPokemonWithRandomMoves(x);
    }, ()=>{return false;});

    return pokemon;
  }
  
  setFirstAttacker(trainer:Pokemon, opponent:Pokemon): boolean {
        
    if (trainer.stats.speed > opponent.stats.speed) {
      
      return true;
    }

    else if (trainer.stats.speed == opponent.stats.speed) {
        
        let randInt:number = this.util.getRandomInt(1, 101);

        if (randInt <= 51) {
          return true;
        }

        else { 
          return false;
        }
    }

    else {
      return false;
    }
  }
}
