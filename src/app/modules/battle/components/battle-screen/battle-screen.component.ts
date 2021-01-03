import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PartyService } from 'src/app/modules/trainer-hub/services/party/party.service';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

  public showMoveButtons:boolean;
  
  private _subscription_user_name: any;
  public trainer:Pokemon[];
  public opponent:Pokemon;
  public isTrainerFirst:boolean;

  constructor(private partyService:PartyService, public battleService:BattleService) { 
    this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
      this.trainer[0] = value;}
    
    //this.opponent = //Call getRandomPo() here directly
    
    this.isTrainerFirst = this.battleService.setFirstAttacker(
      this.trainer[0], this.opponent);
    
      this.showMoveButtons = true;
  }

  ngOnInit(): void {

  }

  private getTrainerPokemon() {
    this.trainer[0] = this.partyService.getPokemon1();
  }
  
  /* Call this method to update pokemon's health: this.partyService.pokemonChange(this.pokemon); */

}
