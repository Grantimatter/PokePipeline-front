import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';
import { LoginModule } from './modules/loginregister/login.module';
import { PartySelectionComponent } from './modules/trainer-hub/components/party-selection/party-selection.component';
import { TrainerHubComponent } from './modules/trainer-hub/components/trainer-hub/trainer-hub.component';
import { BattleScreenComponent } from './modules/battle/components/battle-screen/battle-screen.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: TestComponent },
  { path: 'trainerhub', component: TrainerHubComponent,
    children: [
      { path: 'party', component: PartySelectionComponent, outlet: 'main' },
      { path: 'battle', component: BattleScreenComponent, outlet: 'main'}
    ]
  },
  { path: '**', component: LoginComponent }, 
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
