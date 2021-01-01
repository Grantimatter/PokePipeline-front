import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  pokemon: Pokemon;
  randomPokemon: Pokemon;
  starterPokemon: Pokemon;
  input: number = 1;
  faSpinner = faSpinner;
  selectingPokemon:boolean = false;
  selectingRandom:boolean = false;
  selectingStarter:boolean = false;

  constructor(
    private pokeApiHelperService:PokeApiHelperService,
    private pokemonService:PokemonService
  ) { }

  ngOnInit(): void {
  }

  selectRandomPokemon(){
    this.selectingRandom = true;
    this.pokeApiHelperService.getRandomValidPokemon((x:JSON)=>{
      this.selectingRandom = false;
      this.randomPokemon = this.pokemonService.createNewPokemonWithRandomMoves(x);
    });
  }
  
  selectPokemonWithMoves(){
    this.selectingPokemon = true;
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(this.input, (x:any)=>{
      this.selectingPokemon = false;
      console.log("Selected Pokemon, getting moves");
      this.pokemon = this.pokemonService.createNewPokemonWithRandomMoves(x);
    }, ()=>{
      this.selectingPokemon = false;
      console.log("The requested Pokemon with detailed moves could not be retrieved!")
    });
  }

  selectStarterPokemon() {
    this.selectingStarter = true;
    this.pokeApiHelperService.getValidStarterPokemon((x) => {
      this.selectingStarter = false;
      this.starterPokemon = this.pokemonService.createNewPokemonWithRandomMoves(x);
    });
  }
  
}
