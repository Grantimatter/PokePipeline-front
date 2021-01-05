import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';
import { LoginModule } from './modules/loginregister/login.module';
import { PartySelectionComponent } from './modules/trainer-hub/components/party-selection/party-selection.component';
import { TrainerHubComponent } from './modules/trainer-hub/components/trainer-hub/trainer-hub.component';
import { BattleScreenComponent } from './modules/battle/components/battle-screen/battle-screen.component';
import { AuthenticationGuardService } from './modules/authentication/services/guards/authentication.guard.service';
import { LoggedOutGuardService } from './modules/authentication/services/guards/logged.out.guard.service';
import { UserComponent } from './modules/user/component/user/user.component';
import { DefaultpathresolverComponent } from './modules/defaultpathresolver/defaultpathresolver.component';
import { BattleInterfaceComponent } from './components/battle-interface/battle-interface.component';

const routes: Routes = [
  {
    path: 'trainerhub',
    component: TrainerHubComponent,
    children: [
      { path: 'party', component: PartySelectionComponent, outlet: 'main' },
      { path: 'battle', component: BattleScreenComponent, outlet: 'main'},
      { path: 'tempbattle', component: BattleInterfaceComponent, outlet: 'main'}
    ]
    ,
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoggedOutGuardService],
  },
  {
    path: 'account',
    component: UserComponent,
    canActivate: [AuthenticationGuardService],
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedOutGuardService],
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [LoggedOutGuardService],
  },
  {
    path: '',
    component: DefaultpathresolverComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
