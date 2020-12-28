import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonAPI } from 'src/app/models/pokemon-api';
import { GetPokemonAPIService } from 'src/app/services/get-pokemon-api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public pokemonAPI:PokemonAPI;
  public pokemon:Pokemon;
  public input:number = 1;

  constructor(private getPokemonService:GetPokemonAPIService) { }

  ngOnInit(): void {
  }

  getPokemonAPI():void {
    this.getPokemonService.getPokemonFromAPI(this.input).subscribe(
      (data)=>{
        this.pokemonAPI = data;
      },
      ()=>{
        this.pokemonAPI = null;
        console.log("couldn't retreive pokemond data from api.");
      }
    )
  }

  getAllPokemonMovesAPI():void{
    this.getPokemonService.getPokemonMoves(this.input).subscribe(
      (pokemonData:any)=>{
        this.pokemon.moves = pokemonData;
        console.log(this.pokemon.moves);
      },
      ()=>{
        console.log("Failed to get Pokemon with moves");
      });
  }

}
