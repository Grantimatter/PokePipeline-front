import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';
import { LoginModule } from './modules/loginregister/login.module';
<<<<<<< HEAD
import { PartySelectionComponent } from './modules/trainer-hub/components/party-selection/party-selection.component';
import { TrainerHubComponent } from './modules/trainer-hub/components/trainer-hub/trainer-hub.component';
=======
>>>>>>> 9a3c92dedd08f8ce7bc84a8ab8f27b5b3b9e5f44
import { AuthenticationGuardService } from './modules/authentication/services/guards/authentication.guard.service';
import { LoggedOutGuardService } from './modules/authentication/services/guards/logged.out.guard.service';
import { UserComponent } from './modules/user/component/user/user.component';
import { DefaultpathresolverComponent } from './modules/defaultpathresolver/defaultpathresolver.component';

const routes: Routes = [
  {
<<<<<<< HEAD
    path: 'trainerhub',
    component: TrainerHubComponent,
    children: [
      { path: 'party', component: PartySelectionComponent, outlet: 'main' },
    ],
  },

  {
=======
>>>>>>> 9a3c92dedd08f8ce7bc84a8ab8f27b5b3b9e5f44
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
