import { Injectable } from '@angular/core';
import { Move } from 'src/app/models/move/move';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PartyService } from 'src/app/modules/trainer-hub/services/party/party.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { environment } from 'src/environments/environment';
import { PokemonUtilityModule } from '../../pokemon-utility.module';
import { GetPokemonAPIService } from '../get-pokemon-api/get-pokemon-api.service';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable({
  providedIn: PokemonUtilityModule
})
export class PokeApiHelperService {

  constructor(
    private pokemonService:PokemonService,
    private getPokemonService:GetPokemonAPIService,
    private utilityService:UtilityService,
    private partyService:PartyService
    ) { }
    
  /**
   * Retrieves a Pokémon based on 'input' and sets the value of 'pokemon'.
   * @param {number} id - The Pokédex index of the Pokémon.
   * @param {Function} onSuccess - The callback function to invoke whenever a pokemon object is received.
   * @param {Function} onFail - The callback function to invoke on failure to retrieve the requested Pokémon
   */
  getPokemonAPI(id:number, onSuccess: (pokemon:JSON) => void, onFail? :() => void): void {
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonFromAPI(id).subscribe(
        (resp) => {
          onSuccess(resp);
        },
        () => {
          onFail();
        });
    }
  }

  /**
   * Sets starterPokemon to a randomly selected starter Pokémon.
   * @param {Function} onSuccess - The method to invoke when a starter Pokémon is retrieved.
   */
  getValidStarterPokemon(onSuccess: (pokemon:JSON) => void): void {
    let id = this.utilityService.getRandomInt(1, environment.pokemonRange);
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
        (resp) => {
          if (this.pokemonService.isValidStarter(resp, resp["species"])) {
            if (this.pokemonService.isFirstEvolution(resp["species"])) {
              onSuccess(resp);
            } else {
              this.getFirstEvolutionFromPokemon(resp, onSuccess);
            }
          } else {
            this.getValidStarterPokemon(onSuccess);
          }
        }
      );
    }
  }

  /**
   * Gets a random valid Pokémon with detailed moves and sends it through the callback function provided
   * @param {Function} onSuccess - The method to invoke when a starter Pokémon is retrieved.
   */
  getRandomValidPokemon(onSuccess: (pokemon:JSON) => void): void {
    let id = this.utilityService.getRandomInt(1, environment.pokemonRange);
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithAllMovesAPI(id).subscribe(
        (resp) => {
          if (this.pokemonService.isValidPokemon(resp)) {
              onSuccess(resp);
          } else {
            this.getRandomValidPokemon(onSuccess);
          }
        }
      );
    }
  }

  /**
   * Used to get a trainer's pokemon from the database and set it as the current selected pokemon
   * @param pokemonJSON Pokemon JSON received from database
   */
  getTrainerPokemonWithSpecificMoves(pokemonJSON: JSON): void {
    this.getPokemonWithAllMovesAPI(pokemonJSON["pokemonAPI"] as number, (resp)=>{
      console.dir("Pokemon FROM DB: ", pokemonJSON);
      let pokemon:Pokemon = new Pokemon(resp, pokemonJSON["experience"], pokemonJSON["currentHP"],
      this.getSpecificMoves(resp["moves"],[
        pokemonJSON["move1API"],
        pokemonJSON["move2API"],
        pokemonJSON["move3API"],
        pokemonJSON["move4API"]
        ]));
      
      pokemon.pokemonId = pokemonJSON["pokemonId"];
      this.partyService.pokemonChange(pokemon);
    }, ()=>console.warn("Failed to get trainer's pokemon"));
  }

  /**
   * Gets specific moves from a list of detailed moves
   * @param movesJSON The detailed moves JSON from the PokeAPI
   * @param moveIDs
   */
  private getSpecificMoves(movesJSON: any, moveIDs: number[]): Move[] {

    let moves: Move[] = [];

    for(const i in moveIDs) {
      for(const move of movesJSON) {
        if(move["id"] == moveIDs[i]){
            moves.push(new Move(move));
            break;
        }
      }
    }

    return moves;
  }

  /**
   * Retrieve the first evolution of the given pokemon
   * @param pokemon 
   * @param onSuccess 
   */
  getFirstEvolutionFromPokemon(pokemon: JSON, onSuccess: (pokemon:JSON) => void): void {
    this.getPokemonService.getFirstEvolutionFromPokemonIdAPI(pokemon["species"]["evolves_from_species"]).subscribe(
      (resp) => {
        console.debug(`Retrieved ${resp["name"]} as the first evolution of ${pokemon["name"]}`);
        onSuccess(resp);
      }
    );
  }

  /**
   * Retrieves the specified Pokémon from PokéAPI with detailed moves and invokes a callback function
   * @param id 
   * @param onSuccess 
   * @param onFail 
   */
  getPokemonWithAllMovesAPI(id:number, onSuccess: (pokemon:JSON) => void, onFail: () => void): void {
    // Check input for valid ID before wasting a call to the API on an invalid ID
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
        (pokemonData) => {
          if (this.pokemonService.isValidPokemon(pokemonData)) {
            onSuccess(pokemonData);
          } else {
            console.warn(`${pokemonData["name"]} is not a valid Pokémon!`);
            onFail();
          }
        },
        () => {
          console.warn(`Error retrieving Pokémon [${id}] from PokéAPI`);
          onFail();
        });
    }
  }
}
