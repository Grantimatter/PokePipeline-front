import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BattleScreenComponent} from './components/battle-screen/battle-screen.component';
import { PartyService } from '../trainer-hub/services/party/party.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [BattleScreenComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule
  ],
  providers:[PartyService]
})
export class BattleModule { }
