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

  public pokemon:any;
  public input:number = 1;

  constructor(private getPokemonService:GetPokemonAPIService) { }

  ngOnInit(): void {
  }

  getPokemonAPI():void {
    this.getPokemonService.getPokemonFromAPI(this.input).subscribe(
      (pokemonData:Pokemon)=>{
        this.pokemon=pokemonData;
      },
      ()=>{
        this.pokemon=null;
        console.log("Something went wrong. Try again");
      });
  }

  getPokemonWithAllMovesAPI():void{
    this.getPokemonService.getPokemonWithAllMovesAPI(this.input).subscribe(
      (pokemonData:any)=>{
        this.pokemon = pokemonData;
        console.log(this.pokemon);
      },
      ()=>{
        console.log("Failed to get Pokemon with moves");
      });
    }
}
