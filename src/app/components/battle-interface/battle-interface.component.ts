import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/enums/type.enum';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

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
  classText:string;
  typeText:string;

  constructor(  
    private pokeApiHelperService:PokeApiHelperService,
    private pokemonService:PokemonService,
    private utilityService:UtilityService,
    ) { }

  ngOnInit(): void {
    this.generateOpponent(this.utilityService.getRandomInt(1,606));
    this.generateTrainer(this.utilityService.getRandomInt(1,606));
  }

  displayMoveInfo(num:number) {
    this.classText = "Class:";
    this.typeText = "Type:";
    this.damageClass = this.trainer.moves[num].damage_class;
    this.damageType = this.trainer.moves[num].type;
  }

  generateOpponent(id:number) {
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(id, (x:JSON)=>{
      console.log("Selected Pokemon, getting moves");
      this.opponent = this.pokemonService.createNewPokemonWithRandomMoves(x);
    }, ()=>{
      console.log("The requested Pokemon with detailed moves could not be retrieved!")
    });
  }

  generateTrainer(id:number) {
    this.pokeApiHelperService.getPokemonWithAllMovesAPI(id, (x:JSON)=>{
      console.log("Selected Pokemon, getting moves");
      this.trainer = this.pokemonService.createNewPokemonWithRandomMoves(x);
    }, ()=>{
      console.log("The requested Pokemon with detailed moves could not be retrieved!")
    });
  }

}
