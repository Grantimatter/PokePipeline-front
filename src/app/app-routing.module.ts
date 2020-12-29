import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';
import { LoginModule } from './modules/loginregister/login.module';

const routes: Routes = [
  {
    path: '/',
    component: LoginComponent,
    data: { adjacentRoute: 'register' },
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
  {
    path: 'test',
    component: TestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
