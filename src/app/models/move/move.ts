import { Type } from "../enums/type.enum";

export class Move {
  
  public name: string;
  public power: number;
  public type: Type;
  public accuracy: number;
  public recoil: number;
  public healing: number;
  public damage_class: string;
  public min_hits: number;
  public max_hits: number;

  /**
   * 
   * @param {JSON} moveJSON - The JSON object representing the move
   */
  constructor(moveJSON: any) {
    console.dir(moveJSON);
    this.name = moveJSON["name"];
    this.power = moveJSON["power"];
    this.type = moveJSON["type"]["name"].toUpperCase() as Type;
    this.accuracy = moveJSON["accuracy"];
    this.recoil = moveJSON["meta"]["drain"];
    this.healing = moveJSON["meta"]["healing"];
    this.damage_class = moveJSON["damage_class"]["name"].toUpperCase();
    this.min_hits = moveJSON["meta"]["min_hits"];
    this.max_hits = moveJSON["meta"]["max_hits"];
  }
}
