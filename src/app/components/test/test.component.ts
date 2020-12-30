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

  constructor(
    private getPokemonService: GetPokemonAPIService,
    private pokemonService: PokemonService,
    private utilityServce: UtilityService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Retrieves a Pokémon based on 'input' and sets the value of 'pokemon'.
   */
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

  /**
   * Sets starterPokemon to a randomly selected starter Pokémon.
   */
  getValidStarterPokemon(): void {
    let id = this.utilityServce.getRandomInt(1, 806);
    if (this.pokemonService.isValidPokemonId(id)) {
      this.getPokemonService.getPokemonWithSpeciesAndMovesFromAPI(id).subscribe(
        (resp: any) => {
          if (this.pokemonService.isValidStarter(resp, resp["species"])) {
            if (this.pokemonService.isFirstEvolution(resp["species"])) {
              this.starterPokemon = resp;
              console.log(resp.name + " is a valid starter Pokémon!");
            } else {
              console.log(resp.name + " is valid as a starter but is not the first evolution!");
              this.getFirstEvolutionFromPokemon(resp);
              this.starterPokemon = null;
            }
          } else {
            this.starterPokemon = null;
            this.getValidStarterPokemon();
            console.log(resp.name + " is not a valid starter type.");
          }
        }
      );
    }
  }

  getFirstEvolutionFromPokemon(pokemon: any): void {
    this.getPokemonService.getFirstEvolutionFromPokemonIdAPI(pokemon.species.evolves_from_species).subscribe(
      (resp) => {
        console.log(resp.name + " retrieved as valid starter Pokémon");
        this.starterPokemon = resp;
      }
    );
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
