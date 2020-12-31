import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';

@Component({
  selector: 'app-pokemon-screen',
  templateUrl: './pokemon-screen.component.html',
  styleUrls: ['./pokemon-screen.component.css']
})
export class PokemonScreenComponent implements OnInit {

  pokemon:any;
  selectingStarter:boolean = false;
  faSpinner = faSpinner;

  constructor(private pokeApiHelperService:PokeApiHelperService) {}

  ngOnInit(): void {
    this.selectStarterPokemon();
  }

  selectStarterPokemon() {
    this.selectingStarter = true;
    this.pokeApiHelperService.getValidStarterPokemon((x) => {
      this.selectingStarter = false;
      this.pokemon = x
    });
  }

}
