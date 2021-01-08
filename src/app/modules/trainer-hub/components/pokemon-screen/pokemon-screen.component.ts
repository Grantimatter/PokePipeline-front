import { Component, OnInit } from '@angular/core';
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
  hasTwoTypes:boolean = false;
  private _subscription_user_name: any;

  constructor(
    private pokeApiHelperService:PokeApiHelperService,
    private partyService:PartyService,
    ) {
      this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
        this.pokemon = value;
        if(this.pokemon.types[1]) this.hasTwoTypes = true;
        else this.hasTwoTypes = false;
      });

      this._subscription_user_name = this.partyService.reset.subscribe((value) => {
        this.reset();
      })

    }

    reset() {
      this.pokemon = null;
    }

  ngOnInit(): void {
  }

}
