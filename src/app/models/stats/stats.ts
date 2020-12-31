export class Stats {

  public hp: number;
  public attack: number;
  public defense: number;
  public specialAttack: number;
  public specialDefense: number;
  public speed: number;

  constructor(hp: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number, level?: number) {
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
    this.setScaledStats((level && level >= 1) ? level : 1);
  }

  setScaledStats(level: number): void {
    this.hp = this.scaleHP(level);
    this.attack = this.scaleStat(this.attack, level);
    this.defense = this.scaleStat(this.defense, level);
    this.specialAttack = this.scaleStat(this.specialAttack, level);
    this.specialDefense = this.scaleStat(this.specialDefense, level);
    this.speed = this.scaleStat(this.speed, level);
  }

  /**
   * Creates a new Stats object
   * @param baseStats 
   * @param level 
   * @returns {Stats} - Returns a new Stats object calculated from given baseStats and level
   */
  public static createFromBaseStats(baseStats: Stats, level?: number): Stats {
    return new Stats(baseStats.hp, baseStats.attack, baseStats.defense, baseStats.specialAttack, baseStats.specialDefense, baseStats.speed, level);
  }

  public static createFromJSON(statsJSON, level?: number): Stats {
    return new Stats(
      statsJSON[0]["base_stat"],
      statsJSON[1]["base_stat"],
      statsJSON[2]["base_stat"],
      statsJSON[3]["base_stat"],
      statsJSON[4]["base_stat"],
      statsJSON[5]["base_stat"],
      level
    );

  }

  scaleHP(level): number {
    return Math.floor(0.01 * (2 * this.hp) * level) + level + 10;
  }

  scaleStat(base, level): number {
    return Math.floor(0.01 * (2 * base) * level) + 5;
  }



}
