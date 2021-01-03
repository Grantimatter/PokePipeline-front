import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BattleScreenComponent} from './components/battle-screen/battle-screen.component';
import { PokemonBattleComponent } from './components/pokemon/pokemon-battle/pokemon-battle.component';
import { OpponentPokemonComponent } from './components/opponent-pokemon/opponent-pokemon.component';
import { TrainerPokemonComponent } from './components/trainer-pokemon/trainer-pokemon.component'


@NgModule({
  declarations: [BattleScreenComponent, PokemonBattleComponent, OpponentPokemonComponent, TrainerPokemonComponent],
  imports: [
    CommonModule
  ]
})
export class BattleModule { }
