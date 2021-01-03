import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

  public showMoveButtons:boolean;
  
  public trainer:Pokemon[];
  public opponent:Pokemon;
  public isTrainerFirst:boolean;

  constructor(public battleService:BattleService) { 
    this.trainer = this.battleService.setTrainerPokemon();
    this.opponent = this.battleService.setOpponentPokemon();
    this.isTrainerFirst = this.battleService.setFirstAttacker(
      this.trainer[0], this.opponent);
    this.showMoveButtons = true;
  }

  ngOnInit(): void {

  }

  

}
