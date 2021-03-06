import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerHubComponent } from './components/trainer-hub/trainer-hub.component';
import { OptionScreenComponent } from './components/option-screen/option-screen.component';
import { PokemonScreenComponent } from './components/pokemon-screen/pokemon-screen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PartySelectionComponent } from './components/party-selection/party-selection.component';
import { RouterModule } from '@angular/router';
import { PartyService } from './services/party/party.service';
import { TrainerComponent } from './components/trainer/trainer.component';
import { FormsModule } from '@angular/forms';
import { WinComponent } from './components/win/win.component';

@NgModule({
  declarations: [
    TrainerHubComponent,
    OptionScreenComponent,
    PokemonScreenComponent,
    PartySelectionComponent,
    TrainerComponent,
    WinComponent,
  ],
  exports: [
    TrainerHubComponent,
    OptionScreenComponent,
    PokemonScreenComponent,
    PartySelectionComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule],

  providers: [PartyService],
})
export class TrainerHubModule {}
