import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PartyService } from '../../services/party/party.service';

@Component({
  selector: 'app-pokemon-screen',
  templateUrl: './pokemon-screen.component.html',
  styleUrls: ['./pokemon-screen.component.css']
})
export class PokemonScreenComponent implements OnInit {

  pokemon:any;
  selectingStarter:boolean = false;
  faSpinner = faSpinner;

  constructor(
    private pokeApiHelperService:PokeApiHelperService,
    private data:PartyService,
    ) {}

  ngOnInit(): void {
    this.data.selectedPokemon.subscribe(transferedPokemon => this.pokemon = transferedPokemon)
  }

}
