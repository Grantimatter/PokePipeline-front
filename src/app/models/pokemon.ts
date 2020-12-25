import { Type } from "../enums/type.enum";
import { Move } from "./move";

export class Pokemon {

  constructor(
    public pokemonId:number,
    public name:string,
    public currentHP:number,
    public level:number,
    public type1:Type,
    public type2:Type,

    // moves
    public move1:Move,
    public move2:Move,
    public move3:Move,
    public move4:Move,
    
    // stats
    public hp:number,
    public attack:number,
    public defense:number,
    public specialAttack:number,
    public specialDefense:number,
    public speed:number,
  ) {}

}
