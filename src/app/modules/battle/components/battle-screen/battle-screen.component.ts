import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { TrainerHubComponent } from 'src/app/modules/trainer-hub/components/trainer-hub/trainer-hub.component';
import { PartyService } from 'src/app/modules/trainer-hub/services/party/party.service';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})

export class BattleScreenComponent implements OnInit {

  public showMoveButtons:boolean = false;
  
  private _subscription_user_name: any;
  public trainer:Pokemon;
  public opponent:Pokemon;
  public trainerMaxHealth:number;
  public opponentMaxHealth:number;

  constructor(private pokeHelper:PokeApiHelperService, 
    private pokeService:PokemonService, private partyService:PartyService, 
    public battleService:BattleService) { 
       
    this.getTrainerPokemon();

    this.trainerMaxHealth = this.trainer.currentHP;

    this.getOpponentPokemon();
  }

  attack(attackNum : number) {
    this.battleService.performAttacks(this.trainer, this.opponent, attackNum);
  }

  ngOnInit(): void {
    
  }

  private getTrainerPokemon() {
    this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
      this.trainer = value;})
    
    this.trainer = this.partyService.getPokemon1();
  }

  private getOpponentPokemon() {
    this.pokeHelper.getRandomValidPokemon(
      (x:JSON) => {
        this.opponent = this.pokeService.createNewPokemonWithRandomMoves(x);

        this.opponentMaxHealth = this.opponent.currentHP;

        this.showMoveButtons = true;
      }
      );    
  }
}