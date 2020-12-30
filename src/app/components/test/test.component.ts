import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { GetPokemonAPIService } from 'src/app/modules/pokemon-utility/services/get-pokemon-api/get-pokemon-api.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

/**
 * 
 */
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public pokemon: any;
  public starterPokemon: any;
  public input: number = 1;
  public starterInput: number = 25;

  constructor(
    private getPokemonService: GetPokemonAPIService,
    private pokemonService: PokemonService,
    private utilityServce: UtilityService
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

  getValidStarterPokemon(): void {
      //let id = this.utilityServce.getRandomInt(1, 806);
      let id = this.starterInput;
      console.log(`Checking Pokemon with ID: ${id} for starter validity`);
      if (this.pokemonService.isValidPokemonId(id)) {
        this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
          (resp: Pokemon) => {
            if (this.pokemonService.isValidStarter(resp, resp["species"])) {
              if(this.pokemonService.isFirstEvolution(resp)){
                this.starterPokemon = resp;
              }else{

              }
              console.dir(this.starterPokemon.name + " is a valid starter pokemon!", this.starterPokemon);
            }else{
              //this.getValidStarterPokemon();
              this.starterPokemon = null;
              console.log(resp.name + " is not a valid starter type.");
            }
          }
        );
      }
  }

  getPokemonWithAllMovesAPI(): void {
    // Check input for valid ID before wasting a call to the API on an invalid ID
    if (this.pokemonService.isValidPokemonId(this.input)) {

      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(this.input).subscribe(
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
