import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { HttpClient } from '@angular/common/http';

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
    private pokemonService:PokemonService,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.selectStarterPokemon();
    this.http.post("http://localhost:8080/PokePipeline/auth", {"trainerName":"grantimatter","password":"password","email":"wiswellgrant@gmail.com"}, {withCredentials: true}).subscribe(
      (resp)=>{
        console.log(resp);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  selectRandomPokemon() {
    //waits(3000);
    this.selectingRandom = true;
    this.pokeApiHelperService.getRandomValidPokemon((x:JSON)=>{
      this.selectingRandom = false;
      this.randomPokemon = this.pokemonService.createNewPokemonWithRandomMoves(x);
      console.log(this.randomPokemon);
    });
  }
  
  selectPokemonWithMoves() {
    this.selectingPokemon = true;
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(this.input, (x:JSON)=>{
      this.selectingPokemon = false;
      console.log("Selected Pokemon, getting moves");
      this.pokemon = this.pokemonService.createNewPokemonWithRandomMoves(x);
      console.log(this.pokemon);
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
      this.starterPokemon.setLevel(10);
      this.starterPokemon.heal(this.starterPokemon.stats.hp);
      console.log(this.starterPokemon);
    });
  }
  
}
