import { Component, OnInit } from '@angular/core';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PartyService } from '../../services/party/party.service';


@Component({
  selector: 'app-party-selection',
  templateUrl: './party-selection.component.html',
  styleUrls: ['./party-selection.component.css']
})
export class PartySelectionComponent implements OnInit {

  pokemon:any;
  selectingStarter:boolean = false;

  constructor(
    private pokeApiHelperService:PokeApiHelperService,
    private data:PartyService,
    ) { }

  ngOnInit(): void {
    this.displayStarterPokemon();
    this.data.selectedPokemon.subscribe(transferedPokemon => this.pokemon = transferedPokemon)
  }

  selectStarter() {
    this.data.changePokemon(this.pokemon);
  }

  displayStarterPokemon() {
    this.selectingStarter = true;
    this.pokeApiHelperService.getValidStarterPokemon((x) => {
      this.selectingStarter = false;
      this.pokemon = x
    });
  }

}
