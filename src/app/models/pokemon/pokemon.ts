import { Type } from "../enums/type.enum";
import { Move } from "../move/move";
import { Stats } from "../stats/stats";

export class Pokemon {

  public id: number;
  public name: string;
  public currentHP: number;
  private level: number;
  public types: Type[];
  public moves: Move[];
  public stats: Stats;
  public baseStats: Stats;

  /**
   * 
   * @param {JSON} pokemonJSON - The JSON object representing our Pokemon.
   * @param {number} level - The current level of the Pokemon.
   * @param {number} currentHP - The current HP of the Pokemon.
   * @param {Move[]} moves - The specific moves that this Pokemon possesses.
   */
  constructor(pokemonJSON: JSON, level?: number, currentHP?: number, moves?: Move[]) {
    this.name = pokemonJSON["name"];
    this.baseStats = Stats.createFromJSON(pokemonJSON["stats"]);

    if(level && level > 0){
      this.level = level;
    }else{
      this.level = 1;
    }

    this.stats = Stats.createFromJSON(pokemonJSON["stats"], this.level);

    if (moves) {
      this.moves = moves;
    } else {
      this.moves = pokemonJSON["moves"];
    }
    if(currentHP){
      if(currentHP >= 0){
        this.currentHP = currentHP;
      }else{
        this.currentHP = 0;
      }
    }
  }

  setLevel(newLevel:number):void{
    if(newLevel && newLevel > 0){
      this.level = newLevel;
      this.stats = Stats.createFromBaseStats(this.baseStats, this.level);
    }
  }

  getLevel():number{
    return this.level;
  }
}
