import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public pokemon: any;
  public starterPokemon: any;
  public input: number = 1;

  constructor(
    private pokeApiHelperService:PokeApiHelperService
  ) { }

  ngOnInit(): void {
  }

  setPokemon(pokemon: Pokemon): void {
    this.pokemon = pokemon;
  }

  setStarterPokemon(pokemon: Pokemon): void {
    this.starterPokemon = pokemon;
  }
  
  selectPokemonWithMoves(){
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(this.input, (x)=>this.setPokemon(x));
  }

  selectStarterPokemon() {
    this.pokeApiHelperService.getValidStarterPokemon((x) => this.setStarterPokemon(x));
  }
  
}
