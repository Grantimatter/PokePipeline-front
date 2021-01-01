import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { PartyService } from '../../services/party/party.service';


@Component({
  selector: 'app-party-selection',
  templateUrl: './party-selection.component.html',
  styleUrls: ['./party-selection.component.css']
})
export class PartySelectionComponent implements OnInit {

  pokemon:Pokemon;
  selectingStarter:boolean = false;
  private _subscription_user_name: any;

  constructor(
    private pokeApiHelperService:PokeApiHelperService,
    private partyService:PartyService,
    private pokemonService:PokemonService
    // private data:PartyService,
    ) { 
      this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
        this.pokemon = value;
      })
    }

  ngOnInit(): void {
    this.displayStarterPokemon();
    // this.data.selectedPokemon.subscribe(transferedPokemon => this.pokemon = transferedPokemon)
  }

  /**
   * Will send this.pokemon to PartyService.
   */
  selectStarter() {
    this.partyService.pokemonChange(this.pokemon);
    // this.data.changePokemon(this.pokemon);
  }

  /**
   * Displays the choice(s) for the Trainer's starter Pokemon.
   */
  displayStarterPokemon() {
    this.selectingStarter = true;
    this.pokeApiHelperService.getValidStarterPokemon((x) => {
      this.selectingStarter = false;
      this.pokemon = this.pokemonService.createNewPokemonWithRandomMoves(x);
    });
  }

}
