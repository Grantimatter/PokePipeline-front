import { Injectable } from '@angular/core';
import { Type } from 'src/app/models/enums/type.enum';

@Injectable({
  providedIn: 'root',
})
export class TypeCalculationService {
  // Ordering
  // Normal[0], Fire[1], Water[2], Grass[3], Electric[4], Ice[5]
  // Fighting[6], Poison[7], Ground[8], Flying[9], Psychic[10], Bug[11],
  // Rock[12], Ghost[13], Dragon[14], Dark[15], Steel[16], Fairy[17]
  private typeChart: number[][];

  constructor() {
    this.typeChart = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1], // Normal
      [1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1], // Fire
      [1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1], // Water
      [1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1], // Grass
      [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1], // Electric
      [1, 0.5, 0.5, 2, 1, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1], // Ice
      [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5], // Fighting
      [1, 1, 1, 2, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2], // Poison
      [1, 2, 1, 0.5, 2, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1], // Ground
      [1, 1, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1], // Flying
      [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1], // Psychic
      [1, 0.5, 1, 2, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5], // Bug
      [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1], // Rock
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1], // Ghost
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0], // Dragon
      [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5], // Dark
      [1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2], // Steel
      [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1], // Fairy
    ];
  }

  /**
   * Calculates how much damage an attack would do based on its typing as well as the Opponent's typing.
   * @param power The power of the move being used.
   * @param attackType The type enum of the attack.
   * @param type1 The opponent's first type.
   * @param type2 The opponent's second type.
   */
  calculateTypeModifier(
    power: number,
    attackType: Type,
    type1: Type,
    type2: Type
  ): number {
    let type1Effectiveness = this.getEffectiveness(attackType, type1);
    if (type2 == null) {
      return power * type1Effectiveness;
    } else {
      let type2Effectiveness = this.getEffectiveness(attackType, type2);
      return power * type1Effectiveness * type2Effectiveness;
    }
  }

  /**
   * Adds STAB bonus if Pokemon's type matches the move's type.
   * @param power The power of the move.
   * @param moveType The type of the move.
   * @param type1 Type of Pokemon.
   * @param type2 Type of Pokemon.
   */
  addSTAB(power: number, moveType: Type, type1: Type, type2: Type): number {
    if (moveType == type1) {
      return (power = power * 0.5 + power);
    } else if (type2) {
      if (moveType == type2) {
        return (power = power * 0.5 + power);
      }
    }
  }

  /**
   * Helper function that returns how effective an attack type is against the opponent's type
   * inside the typeChart.
   */
  private getEffectiveness(attack: Type, defense: Type): number {
    return this.typeChart[this.getIndex(attack)][this.getIndex(defense)];
  }

  /**
   * Helper function that returns the index of a type.
   */
  private getIndex(type: Type): number {
    switch (type) {
      case 'BUG':
        return 11;
      case 'DARK':
        return 15;
      case 'DRAGON':
        return 14;
      case 'ELECTRIC':
        return 4;
      case 'FAIRY':
        return 17;
      case 'FIGHTING':
        return 6;
      case 'FIRE':
        return 1;
      case 'FLYING':
        return 9;
      case 'GHOST':
        return 13;
      case 'GRASS':
        return 3;
      case 'GROUND':
        return 8;
      case 'ICE':
        return 5;
      case 'NORMAL':
        return 0;
      case 'POISON':
        return 7;
      case 'PSYCHIC':
        return 10;
      case 'ROCK':
        return 12;
      case 'STEEL':
        return 16;
      case 'WATER':
        return 2;
      default:
        console.warn('Somehow got a nonexistant enum.');
    }
  }
}
