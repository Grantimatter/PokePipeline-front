import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';
import { LoginModule } from './modules/loginregister/login.module';
import { TrainerHubComponent } from './modules/trainer-hub/components/trainer-hub/trainer-hub.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: TestComponent },
  { path: 'trainerhub', component: TrainerHubComponent },
  { path: '**', component: LoginComponent }, 
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
