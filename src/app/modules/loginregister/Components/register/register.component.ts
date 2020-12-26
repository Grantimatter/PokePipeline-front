import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { UserModel } from 'src/app/Models/User/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private registerService: RegisterService;
  public userToRegister: UserModel;
  constructor(private injectedRegisterService: RegisterService) {
    this.registerService = injectedRegisterService;
    this.userToRegister = new UserModel();
  }

  ngOnInit(): void {}
}
