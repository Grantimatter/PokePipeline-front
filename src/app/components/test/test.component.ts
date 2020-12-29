import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { GetPokemonAPIService } from 'src/app/services/get-pokemon-api.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public pokemon: any;
  public input: number = 1;

  constructor(
    private getPokemonService: GetPokemonAPIService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
  }

  getPokemonAPI(): void {
    if (this.pokemonService.isValidPokemonId(this.input)) {
      this.getPokemonService.getPokemonFromAPI(this.input).subscribe(
        (pokemonData: Pokemon) => {
          this.pokemon = pokemonData;
        },
        () => {
          this.pokemon = null;
          console.log("Something went wrong. Try again");
        });
    }
  }

  getPokemonWithAllMovesAPI(): void {
    if (this.pokemonService.isValidPokemonId(this.input)) {
      this.getPokemonService.getPokemonWithAllMovesAPI(this.input).subscribe(
        (pokemonData: Pokemon) => {
          if (this.pokemonService.isValidPokemon(pokemonData)) {
            this.pokemon = pokemonData;
            console.log(this.pokemon);
          } else {
            this.pokemon = null;
          }
        },
        () => {
          console.log("Failed to get Pokemon with moves");
        });
    }
  }
}
