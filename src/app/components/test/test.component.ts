import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  pokemon: any;
  randomPokemon: any;
  starterPokemon: any;
  input: number = 1;
  faSpinner = faSpinner;
  selectingPokemon:boolean = false;
  selectingRandom:boolean = false;
  selectingStarter:boolean = false;

  constructor(
    private pokeApiHelperService:PokeApiHelperService
  ) { }

  ngOnInit(): void {
  }

  setPokemon(pokemon: Pokemon): void {
    this.pokemon = pokemon;
  }

  setStarterPokemon(pokemon: Pokemon): void {
    this.selectingStarter = false;
    this.starterPokemon = pokemon;
  }

  selectRandomPokemon(){
    this.selectingRandom = true;
    this.pokeApiHelperService.getRandomValidPokemon((x)=>{
      this.selectingRandom = false;
      this.randomPokemon = x;
    });
  }
  
  selectPokemonWithMoves(){
    this.selectingPokemon = true;
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(this.input, (x)=>{
      this.selectingPokemon = false;
      this.pokemon = x;
    }, ()=>{
      this.selectingPokemon = false;
      console.log("The requested Pokemon with detailed moves could not be retrieved!")
    });
  }

  selectStarterPokemon() {
    this.selectingStarter = true;
    this.pokeApiHelperService.getValidStarterPokemon((x) => {
      this.selectingStarter = false;
      this.starterPokemon = x
    });
  }
  
}
