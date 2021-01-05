import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BattleScreenComponent} from './components/battle-screen/battle-screen.component';
import { PartyService } from '../trainer-hub/services/party/party.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BattleScreenComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:[PartyService]
})
export class BattleModule { }
