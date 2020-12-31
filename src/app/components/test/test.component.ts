import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Type } from 'src/app/models/enums/type.enum';
import { Move } from 'src/app/models/move/move';
import { Stats } from 'src/app/models/stats/stats';

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
    private pokeApiHelperService:PokeApiHelperService
  ) { }

  ngOnInit(): void {
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
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(this.input, (x:any)=>{
      this.selectingPokemon = false;
      this.pokemon = x;
      
      let realPokemon:Pokemon = new Pokemon(x, 4);
      let move1 = new Move(x["moves"][11]);
      realPokemon.moves = [move1];
      console.log(realPokemon);
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
