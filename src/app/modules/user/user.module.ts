import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './component/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class UserModule {}
