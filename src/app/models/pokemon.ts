import { Stats } from "fs";
import { Type } from "../enums/type.enum";
import { Move } from "./move";

export class Pokemon {

  constructor(
    public pokemonId:number,
    public name:string,
    public currentHP:number,
    public level:number,
    public types:Type[],
    public moves:Move[],
    public stats:Stats,
    public baseStats:Stats,
  ) {}

}
