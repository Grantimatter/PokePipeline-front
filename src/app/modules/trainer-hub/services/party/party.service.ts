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

  reset: Subject<any> = new Subject<any>();
  pokemon1: Subject<Pokemon> = new Subject<Pokemon>();
  pokemonVar: Pokemon;

  battleCountSubject: Subject<number> = new Subject<number>();
  battleCount:number = 0;

  constructor() { }

  resetPokemon() {
    this.pokemon1 = new Subject<Pokemon>();
    this.pokemonVar = null;
    // this.pokemon1.next(null);
    this.reset.next();
  }

  getPokemon1() {
    return this.pokemonVar;
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

}
