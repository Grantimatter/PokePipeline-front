import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from 'src/app/models/enums/type.enum';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokeDatabaseService } from 'src/app/modules/pokemon-utility/services/poke-database/poke-database.service';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';
import { PokemonService } from 'src/app/modules/pokemon-utility/services/pokemon/pokemon.service';
import { TrainerHubComponent } from 'src/app/modules/trainer-hub/components/trainer-hub/trainer-hub.component';
import { PartyService } from 'src/app/modules/trainer-hub/services/party/party.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})

export class BattleScreenComponent implements OnInit {

  public showMoveButtons:boolean = false;
  
  private _subscription_user_name: any;
  public opponentRow:HTMLElement;
  public trainerRow:HTMLElement;
  public trainer:Pokemon;
  public opponent:Pokemon;
  public trainerMaxHealth:number;
  public opponentMaxHealth:number;
  public attackUsed:String;

  isTrainer:boolean = false;
  isOpponent:boolean = false;
  power:number;
  damageClass:string;
  damageType:Type;
  powerText:string;
  classText:string;
  typeText:string;

  constructor(
    private pokeHelper:PokeApiHelperService, 
    private pokeService:PokemonService, 
    private partyService:PartyService, 
    public battleService:BattleService,
    private utilityService:UtilityService,
    private pokeDatabaseService:PokeDatabaseService,
    private router: Router,
    private route: ActivatedRoute,
    ) { 
       
    this.getTrainerPokemon();

    this.trainerMaxHealth = this.trainer.stats.hp;

    this.getOpponentPokemon();

    this.attackUsed = '';
  }

  // EXTRA: disable battle button if no pokemon selected
  enemyInfoHide() {
    document.getElementById("enemyInfo").style.display = "none";
  }
  
  attack(attackNum : number) {
    document.getElementById("enemyInfo").style.display = "inline-block";

    setTimeout(this.enemyInfoHide, 3000);
    
    this.attackUsed = this.battleService.performAttacks(this.trainer, this.opponent, attackNum);    
    
    console.log(this.attackUsed);
    if (this.trainer.currentHP == 0 || this.opponent.currentHP == 0) { // check if battle ends
      if (this.opponent.currentHP == 0) {
        
        this.partyService.addVictory();
        
        this.trainer.setLevel(this.trainer.getLevel() + 1);

        if (this.trainer.currentHP / this.trainerMaxHealth <= 0.5) {
          this.trainer.currentHP += Math.ceil(this.trainerMaxHealth * .5);
        }

        else {
          this.trainer.currentHP = this.trainerMaxHealth;          
        }

        this.pokeDatabaseService.updatePokemon(this.trainer, ()=>console.log("Pokemon updated: ", this.trainer));

        this.router.navigate(['/trainerhub/']);
      }
      if (this.trainer.currentHP == 0) {

        this.pokeDatabaseService.killPokemon(this.trainer, ()=>console.debug("Pokemon successfully died"));

        this.trainer = null;
        this.partyService.resetPokemon();
        this.router.navigate([{outlets:{main:['gameover']}}],{relativeTo: this.route.parent})
      }
      
    }
  }

  ngOnInit(): void {
    
  }

  private getTrainerPokemon() {
    this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
      this.trainer = value;
      this.isTrainer = true;
    })
    
    this.trainer = this.partyService.getPokemon1();
  }

  private getOpponentPokemon() {
    this.pokeHelper.getRandomValidPokemon(
      (x:JSON) => {
        let pokemon = JSON.parse(JSON.stringify(x));

        let isLegend:boolean = (pokemon.species.is_legendary == "true" 
          || pokemon.species.is_mythical == "true");
        
        this.opponent = this.pokeService.createNewPokemonWithRandomMoves(x);
        this.isOpponent = true;
        this.opponentMaxHealth = this.opponent.currentHP;

        if (this.trainer.getLevel() > 1) {
          this.opponent.setLevel(
            this.battleService.setOpponentLevel(
              this.trainer.getLevel(), isLegend));
              
        }

        this.showMoveButtons = true;
      }
      );    
  }

  undoInfo(num:number) {
    let moveButton = document.getElementById(`move${num}`);
    moveButton.style.boxShadow = "none";
    moveButton.style.background = "none";
    moveButton.style.border = "none";
  }

  changeColorOnHover(num:number) {
    let moveType = this.trainer.moves[num].type;
    let typeColor = this.utilityService.getTypeColor(moveType);
    let moveButton = document.getElementById(`move${num}`);
    moveButton.style.boxShadow = `0 0 20px ${typeColor}`;
    moveButton.style.background = `${typeColor}`;
    moveButton.style.border = "2px solid #00000070";
  }

  displayMoveInfo(num:number) {
    this.powerText = "Power:";
    this.classText = "Class:";
    this.typeText = "Type:";
    this.power = this.trainer.moves[num].power;
    this.damageClass = this.trainer.moves[num].damage_class;
    this.damageType = this.trainer.moves[num].type;
    this.changeColorOnHover(num);
  }
}