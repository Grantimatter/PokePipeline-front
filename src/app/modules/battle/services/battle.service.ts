import { Injectable } from '@angular/core';
import { Move } from 'src/app/models/move/move';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { TypeCalculationService } from 'src/app/services/type-calculation/type-calculation.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { PokeApiHelperService } from '../../pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from '../../pokemon-utility/services/pokemon/pokemon.service';
import { PartyService } from '../../trainer-hub/services/party/party.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  
  performAttacks(trainer: Pokemon, opponent: Pokemon, attackNum: number) {
    let trainerMove:Move = trainer.moves[attackNum];
    let opponentMove:Move = opponent.moves[this.util.getRandomInt(0,3)];
    let isTrainerFirst:boolean = this.setAttackOrder(trainer, opponent);

    if (isTrainerFirst) {
      let trainerDamage:number = this.calculateDamage(
        trainer, opponent, trainerMove);
      if (trainerMove.recoil != 0.0) {
        trainer.currentHP += 
          Math.ceil((trainerMove.recoil / 100) * trainerDamage);
      }   
      if ((opponent.currentHP - trainerDamage) <= 0) {
        opponent.currentHP = 0;
      }
      else {
        opponent.currentHP -= trainerDamage;
      }

      if (opponent.currentHP > 0) {
        let opponentDamage = this.calculateDamage(
          opponent, trainer, opponentMove);

        if (opponentMove.recoil != 0.0) {
          opponent.currentHP += 
            Math.ceil((opponentMove.recoil / 100) * opponentDamage);
        }

        if ((trainer.currentHP - opponentDamage) <= 0) {
          trainer.currentHP = 0;
        }
  
        else {
          trainer.currentHP -= opponentDamage;
        }
      }

      else {
        return;
      }
    }

    else {
      let opponentDamage = this.calculateDamage(
        opponent, trainer, opponentMove);

      if (opponentMove.recoil != 0.0) {
        opponent.currentHP += 
          Math.ceil((opponentMove.recoil / 100) * opponentDamage);
      }

      if ((trainer.currentHP - opponentDamage) <= 0) {
        trainer.currentHP = 0;
      }

      else {
        trainer.currentHP -= opponentDamage;
      }

      if (trainer.currentHP > 0) {
        let trainerDamage:number = this.calculateDamage(
          trainer, opponent, trainerMove);

        if (trainerMove.recoil != 0.0) {
          trainer.currentHP += 
            Math.ceil((trainerMove.recoil / 100) * trainerDamage);
        }
        
        if ((opponent.currentHP - trainerDamage) <= 0) {
          opponent.currentHP = 0;
        }
  
        else {
          opponent.currentHP -= trainerDamage;
        }
      }

      else {
        return;
      }
    }
  }

  constructor(private pokeHelper:PokeApiHelperService, 
    private pokeService:PokemonService,
    private partyService:PartyService,
    private util:UtilityService,
    private typeCalculation:TypeCalculationService,
    ) { 
    
  }

  setOpponentLevel(trainerLevel:number, isLegendary:boolean) : number {
    if (trainerLevel == 2) {
      if (!isLegendary) {
        return this.util.getRandomInt(1,2);
      }

      else {
        return 1;
      }
    }

    if (trainerLevel > 2 && trainerLevel <= 5) {
      if (!isLegendary) {
        return this.util.getRandomInt(trainerLevel - 1, trainerLevel + 1);
      }

      else {
        return this.util.getRandomInt(trainerLevel - 1, trainerLevel);
      }
    }

    if (trainerLevel > 5 && trainerLevel <= 10) {
      if (!isLegendary) {
        return this.util.getRandomInt(trainerLevel - 2, trainerLevel + 2);
      }

      else {
        return this.util.getRandomInt(trainerLevel - 2, trainerLevel);
      }
    }

    if (trainerLevel > 10) {
      if (!isLegendary) {
        return this.util.getRandomInt(trainerLevel - 2, trainerLevel + 5);
      }

      else {
        return this.util.getRandomInt(trainerLevel - 4, trainerLevel);
      }
    }
  }
  
  setAttackOrder(trainer:Pokemon, opponent:Pokemon): boolean {
        
    if (trainer.stats.speed > opponent.stats.speed) {
      
      return true;
    }

    else if (trainer.stats.speed == opponent.stats.speed) {
        
        let randInt:number = this.util.getRandomInt(1, 101);

        if (randInt <= 51) {
          return true;
        }

        else { 
          return false;
        }
    }

    else {
      return false;
    }
  }

  calculateDamage(attacker:Pokemon, defender: Pokemon, move:Move) : number {
    let level:number = attacker.getLevel();
    let power:number = move.power;
    let attack:number = 0;
    let defense:number = 0;
    let criticalHit:number = this.util.getRandomInt(1,100);
    
    if (move.damage_class == "physical") {
      attack = attacker.stats.attack;
      defense = defender.stats.defense;
    }
    
    if (move.damage_class == "special") {
      attack = attacker.stats.specialAttack;
      defense = defender.stats.specialDefense;
    }

    let levelDamage = Math.floor((2 * level) / 5) + 2;

    levelDamage *= power;

    levelDamage *= Math.floor(attack/defense);

    levelDamage = Math.floor(levelDamage / 50) + 2;

    levelDamage = this.typeCalculation.calculateTypeModifier(
      levelDamage,
      move.type,
      defender.types[0],
      defender.types[1] ? defender.types[1] : null
    );

    if (levelDamage == 0) {
      return 1;
    }

    else {
      if (criticalHit < 16) {
        levelDamage = Math.ceil(levelDamage * 1.5);
      }

      if (move.min_hits >= 2) {
        levelDamage *= move.min_hits;
      }

      return levelDamage;
    }
  }
}