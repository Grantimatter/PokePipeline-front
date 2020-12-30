import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerHubComponent } from './components/trainer-hub/trainer-hub.component';
import { RouterModule } from '@angular/router';
import { OptionScreenComponent } from './components/option-screen/option-screen.component';
import { PokemonScreenComponent } from './components/pokemon-screen/pokemon-screen.component';



@NgModule({
  declarations: [TrainerHubComponent, OptionScreenComponent, PokemonScreenComponent],
  exports: [TrainerHubComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TrainerHubModule { }
