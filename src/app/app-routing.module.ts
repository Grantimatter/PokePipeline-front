import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { LogRegNavbar } from './modules/loginregister/components/navbar/navbar.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
