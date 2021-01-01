export class Sprites {

    public front_default: string;
    public back_default: string;
    public front_shiny: string;
    public back_shiny: string;
    public official_artwork: string;

    constructor(spritesJSON: JSON) {
        this.front_default = spritesJSON["front_default"];
        this.back_default = spritesJSON["back_default"];
        this.front_shiny = spritesJSON["front_shiny"];
        this.back_shiny = spritesJSON["back_shiny"];
        this.official_artwork = spritesJSON["other"]["official-artwork"]["front_default"];
    }
}
