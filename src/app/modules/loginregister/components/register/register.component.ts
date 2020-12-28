import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { UserModel } from 'src/app/Models/User/UserModel';
import { BasicValidationService } from 'src/app/GlobalServices/basic-validation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private INVALID_REGISTRATION_FIELDS =
    'Username,password, and email are required to register.';
  private REGISTRATION_FIELD =
    'Your registration failed. Your username or email may be taken.';

  private registerService: RegisterService;
  private validationService: BasicValidationService;

  public validRegistratonFields: boolean;
  public warningMessage: string;

  public userToRegister: UserModel;
  constructor(
    private injectedRegisterService: RegisterService,
    private injectedValidationService: BasicValidationService
  ) {
    this.registerService = injectedRegisterService;
    this.validationService = injectedValidationService;
    this.userToRegister = new UserModel();
    this.validRegistratonFields = false;
    this.warningMessage = '';
  }

  ngOnInit(): void {}

  registerUser(): void {
    if (
      this.injectedRegisterService.validateServiceArgument(this.userToRegister)
    ) {
      this.registerService.provideService(this.userToRegister);
      this.warningMessage = '';
    } else {
      this.warningMessage = this.INVALID_REGISTRATION_FIELDS;
    }
  }

  private subscribeToRegisterObservable(
    registerObservable: Observable<Object>
  ) {}
}
