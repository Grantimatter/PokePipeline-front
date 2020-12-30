import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerHubComponent } from './components/trainer-hub/trainer-hub.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TrainerHubComponent],
  exports: [TrainerHubComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TrainerHubModule { }
