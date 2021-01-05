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

  power:number;
  damageClass:string;
  damageType:Type;

  powerText:string;
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

  undoInfo(num:number) {
    let moveButton = document.getElementById(`move${num}`);
    moveButton.style.boxShadow = "none";
    moveButton.style.background = "none";
    moveButton.style.border = "none";
  }

  changeColorOnHover(num:number) {
    let moveType = this.trainer.moves[num].type;
    let typeColor = this.utilityService.getTypeColor(moveType);
    let moveButton = document.getElementById(`move${num}`);
    moveButton.style.boxShadow = `0 0 20px ${typeColor}`;
    moveButton.style.background = `${typeColor}`;
    moveButton.style.border = "2px solid #00000070";
  }

  displayMoveInfo(num:number) {
    this.powerText = "Power:";
    this.classText = "Class:";
    this.typeText = "Type:";
    this.power = this.trainer.moves[num].power;
    this.damageClass = this.trainer.moves[num].damage_class;
    this.damageType = this.trainer.moves[num].type;
    this.changeColorOnHover(num);
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
