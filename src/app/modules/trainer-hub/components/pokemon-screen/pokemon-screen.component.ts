import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PartyService } from '../../services/party/party.service';

@Component({
  selector: 'app-pokemon-screen',
  templateUrl: './pokemon-screen.component.html',
  styleUrls: ['./pokemon-screen.component.css']
})
export class PokemonScreenComponent implements OnInit {

  pokemon:Pokemon;
  selectingStarter:boolean = false;
  faSpinner = faSpinner;
  hasTwoTypes:boolean = false;
  private _subscription_user_name: any;

  constructor(
    private pokeApiHelperService:PokeApiHelperService,
    private partyService:PartyService,
    ) {
      this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
        this.pokemon = value;
        if(this.pokemon.types.length > 1) this.hasTwoTypes = true;
        else this.hasTwoTypes = false;
        console.log(this.pokemon);
      })
    }

  ngOnInit(): void {
    // this.data.selectedPokemon.subscribe(transferedPokemon => this.pokemon = transferedPokemon)
  }

  consolePoke() {
    console.log(this.pokemon);
  }

}
