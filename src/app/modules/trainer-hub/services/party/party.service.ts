import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';

/**
 * Holds the Trainer's party.
 */
@Injectable({
  providedIn: 'root'
})
export class PartyService {

  pokemon1: Subject<Pokemon> = new Subject<Pokemon>();
  pokemonVar: Pokemon;

  battleCountSubject: Subject<number> = new Subject<number>();
  battleCount:number = 0;

  constructor() { }

  getPokemon1() {
    return this.pokemonVar;
  }

  resetBattleCount() {
    this.battleCount = 0;
  }

  getBattleCount() : number {
    return this.battleCount;
  }

  addVictory() {
    this.battleCount++;
  }

  /**
   * Use to change pokemon. Pokemon must be a valid Pokemon model, not a JSON.
   * @data type: Pokemon 
   * @description !Warning: might cause problems as well when you're casting a response as a Pokemon 
   */
  pokemonChange(data: Pokemon) {
    this.pokemon1.next(data);
    this.pokemonVar = data;
  }

  /**
   * Receives a pokemon from a component and holds it as a BehaviorSubject.
   * @param transferedPokemon This is the pokemon that is being recieved.
   */
  // changePokemon(transferedPokemon:any) {
  //   this.pokemon.next(transferedPokemon);
  // }

}
