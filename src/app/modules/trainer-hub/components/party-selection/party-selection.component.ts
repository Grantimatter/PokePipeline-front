import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { PartyService } from '../../services/party/party.service';
import { PokemonDatabaseService } from '../../services/pokemon-database/pokemon-database.service';


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
    private pokemonService:PokemonService,
    private pokemonDatabaseService:PokemonDatabaseService,
    ) { 
      this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
        this.pokemon = value;
      })
    }

  ngOnInit(): void {
    this.displayStarterPokemon();
  }

  /**
   * Will send this.pokemon to PartyService and will send this.pokemon to 
   * PokemonDatabaseService which sends post request to insert this.pokemon into the database.
   */
  selectStarter() {
    this.partyService.pokemonChange(this.pokemon);
    this.pokemonDatabaseService.addPokemonToParty(this.pokemon);
  }

  /**
   * Displays the choice(s) for the Trainer's starter Pokemon.
   */
  displayStarterPokemon() {
    this.pokeApiHelperService.getValidStarterPokemon((x) => {
      this.selectingStarter = false;
      this.pokemon = this.pokemonService.createNewPokemonWithRandomMoves(x);
    });
  }

}
