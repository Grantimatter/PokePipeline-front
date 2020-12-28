import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LogRegNavbar } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, LogRegNavbar, RegisterComponent],
  exports: [LoginComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class LoginModule {}
