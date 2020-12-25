export class PokemonAPI {

  constructor(
    public name:string,
    public sprites:object,
    public types:object[],
    public moves:object[],
    public stats:object[],
  ) {}

}
