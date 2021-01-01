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

  changePokemon(transferedPokemon:any) {
    this.pokemon.next(transferedPokemon);
  }

}
