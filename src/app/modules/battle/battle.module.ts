import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BattleScreenComponent} from './components/battle-screen/battle-screen.component';
import { PartyService } from '../trainer-hub/services/party/party.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GameoverComponent } from './components/gameover/gameover.component';

@NgModule({
  declarations: [BattleScreenComponent, GameoverComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule
  ],
  exports: [GameoverComponent, BattleScreenComponent],
  providers:[PartyService]
})
export class BattleModule { }
