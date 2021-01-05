import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/enums/type.enum';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';

@Component({
  selector: 'app-battle-interface',
  templateUrl: './battle-interface.component.html',
  styleUrls: ['./battle-interface.component.css']
})
export class BattleInterfaceComponent implements OnInit {

  trainer:Pokemon;
  opponent:Pokemon;
  damageClass:string;
  damageType:Type;

  constructor(  
    private pokeApiHelperService:PokeApiHelperService,
    private pokemonService:PokemonService,
    ) { }

  ngOnInit(): void {
    this.generateOpponent();
    this.generateTrainer();
  }

  displayMoveInfo(num:number) {
    this.damageClass = this.trainer.moves[num].damage_class;
    this.damageType = this.trainer.moves[num].type;
  }

  generateOpponent() {
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(150, (x:JSON)=>{
      console.log("Selected Pokemon, getting moves");
      this.opponent = this.pokemonService.createNewPokemonWithRandomMoves(x);
    }, ()=>{
      console.log("The requested Pokemon with detailed moves could not be retrieved!")
    });
  }

  generateTrainer() {
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(1, (x:JSON)=>{
      console.log("Selected Pokemon, getting moves");
      this.trainer = this.pokemonService.createNewPokemonWithRandomMoves(x);
    }, ()=>{
      console.log("The requested Pokemon with detailed moves could not be retrieved!")
    });
  }

}
