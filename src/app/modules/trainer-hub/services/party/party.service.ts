import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Holds the Trainer's party.
 */
@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private pokemon:any = new BehaviorSubject(null);
  selectedPokemon = this.pokemon.asObservable();

  constructor() { }

  /**
   * Receives a pokemon from a component and holds it as a BehaviorSubject.
   * @param transferedPokemon This is the pokemon that is being recieved.
   */
  changePokemon(transferedPokemon:any) {
    this.pokemon.next(transferedPokemon);
  }

}
