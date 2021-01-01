import { Url } from "url";
import { Type } from "../enums/type.enum";
import { Move } from "../move/move";
import { Sprites } from "../sprites/sprites";
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
  public sprites: Sprites;

  /**
   * 
   * @param {JSON} pokemonJSON - The JSON object representing our Pokemon.
   * @param {number} level - The current level of the Pokemon.
   * @param {number} currentHP - The current HP of the Pokemon.
   * @param {Move[]} moves - The specific moves that this Pokemon possesses.
   */
  constructor(pokemonJSON: JSON, level?: number, currentHP?: number, moves?: Move[]) {

    // Set level to 1 or whatever is provided.
    this.level = (level && level > 1) ? level : 1;
    // Set moves to given or JSON if none are provided.
    this.moves = moves ? moves : pokemonJSON["moves"];
    this.name = pokemonJSON["name"];
    this.baseStats = Stats.createFromJSON(pokemonJSON["stats"]);
    this.stats = Stats.createFromJSON(pokemonJSON["stats"], this.level);
    this.types = [pokemonJSON["types"][0]["type"]["name"].toUpperCase() as Type];
    this.sprites = new Sprites(pokemonJSON["sprites"]);
    this.currentHP = (currentHP && currentHP >= 0) ? currentHP : this.stats.hp;
    // Sets the pokemon's second type if there is one.
    if (pokemonJSON["types"][1]) this.types.push(pokemonJSON["types"][1]["type"]["name"].toUpperCase() as Type);
  }

  /**
   * Takes level and calculates new stats based on baseStats.
   * @param newLevel 
   */
  setLevel(newLevel: number): void {
    if (newLevel && newLevel > 0) {
      this.level = newLevel;
      this.stats = Stats.createFromBaseStats(this.baseStats, this.level);
    }
  }

  getLevel(): number {
    return this.level;
  }

  /**
   * Heals the Pokmeon by given points limited by their maximum HP
   * @param {number} value - The number of hitpoints to heal.
   */
  heal(value:number): void{
    this.currentHP = this.currentHP + value <= this.stats.hp ? this.currentHP + value : this.stats.hp;
  }
}
