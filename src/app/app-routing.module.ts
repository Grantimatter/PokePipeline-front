import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './modules/loginregister/components/login/login.component';
import { LogRegNavbar } from './modules/loginregister/components/navbar/navbar.component';
import { RegisterComponent } from './modules/loginregister/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
