import { Type } from "../enums/type.enum";
import { Move } from "../move/move";
import { Stats } from "../stats/stats";

export class Pokemon {

  constructor(
    public id:number,
    public name:string,
    public currentHP:number,
    public level:number,
    public types:Type[],
    public moves:Move[],
    public stats:Stats,
    public baseStats:Stats,
  ) {}

}
