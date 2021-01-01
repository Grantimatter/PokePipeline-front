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

  constructor() { }

  /**
   * Use to change pokemon
   * @data type: Pokemon
   */
  pokemonChange(data: Pokemon) {
    this.pokemon1.next(data);
  }

  /**
   * Receives a pokemon from a component and holds it as a BehaviorSubject.
   * @param transferedPokemon This is the pokemon that is being recieved.
   */
  // changePokemon(transferedPokemon:any) {
  //   this.pokemon.next(transferedPokemon);
  // }

}
