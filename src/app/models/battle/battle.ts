import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { PartyService } from 'src/app/modules/trainer-hub/services/party/party.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Pokemon } from '../pokemon/pokemon'

export class Battle {

    private trainer:Pokemon[];
    private opponent:Pokemon;

    constructor(private pokeHelper:PokeApiHelperService, 
        private pokeService:PokemonService,
        private partyService:PartyService,
        private util:UtilityService) {
        
        /* TODO: Implement getting trainer pokemon properly
        *  this.trainer = this.partyService.getPokemon1();
        */
        
        //Generate Psyduck as trainer pokemon for testing puposes
        pokeHelper.getPokemonWithAllMovesAPI(54, (x:JSON)=> {
            this.trainer[0] = pokeService.createNewPokemonWithRandomMoves(x);
            }, ()=>{return false;});

        //Get random pokemon as opponent
        pokeHelper.getPokemonWithAllMovesAPI(util.getRandomInt(1, 807), 
            (x:JSON)=> {
            this.opponent = pokeService.createNewPokemonWithRandomMoves(x);
            }, ()=>{return false;});
    }
}