import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/loginregister/Components/login/login.component';
import { LogRegNavbar } from './modules/loginregister/Components/navbar/navbar.component';
import { RegisterComponent } from './modules/loginregister/Components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { adjacentRoute: 'register' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { adjacentRoute: 'login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
