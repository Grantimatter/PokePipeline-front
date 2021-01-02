import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';
import { LoginModule } from './modules/loginregister/login.module';
import { AuthenticationGuardService } from './modules/authentication/services/guards/authentication.guard.service';
import { LoggedOutGuardService } from './modules/authentication/services/guards/logged.out.guard.service';
import { UserComponent } from './modules/user/component/user/user.component';
import { DefaultpathresolverComponent } from './modules/defaultpathresolver/defaultpathresolver.component';

const routes: Routes = [
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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
