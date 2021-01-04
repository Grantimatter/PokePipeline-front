import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BattleScreenComponent} from './components/battle-screen/battle-screen.component';
import { PartyService } from '../trainer-hub/services/party/party.service';

@NgModule({
  declarations: [BattleScreenComponent],
  imports: [
    CommonModule
  ],
  providers:[PartyService]
})
export class BattleModule { }
