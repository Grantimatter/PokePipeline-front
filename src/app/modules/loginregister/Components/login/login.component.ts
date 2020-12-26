import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/modules/loginregister/services/login.service';
import { BasicValidationService } from 'src/app/GlobalServices/basic-validation.service';
import { UserModel } from '../../../../Models/User/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login.horizontal.strp.css'],
})
export class LoginComponent implements OnInit, OnChanges {
  private static readonly INCORRECT_CREDENTIALS_MESSAGE: string =
    "We couldn't find that poke-user and poke-pass combination, poke-trainer.";
  private static readonly INVALID_CREDENTIALS_MESSAGE: string =
    'Please enter a non-empty poke-user and poke-pass, poke-trainer.';

  private logInService: LoginService;
  private validationService: BasicValidationService;

  public userModel: UserModel;
  public userMessage: string;
  public validUsrPassCombo: boolean;

  constructor(
    private injectedLoginService: LoginService,
    private injectedGlobalValidationService: BasicValidationService
  ) {
    this.logInService = injectedLoginService;
    this.validationService = injectedGlobalValidationService;

    this.userModel = new UserModel();
    this.userModel.username = '';
    this.userModel.password = '';

    this.validUsrPassCombo = false;
  }

  public logIn(): void {
    if (this.validUsrPassCombo) {
    }
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    alert('Changes');
    this.validUsrPassCombo = this.logInService.validateServiceArgument(
      this.userModel
    );

    if (!this.validUsrPassCombo) {
      this.userMessage = LoginComponent.INVALID_CREDENTIALS_MESSAGE;
    } else {
      this.userMessage = '';
    }
  }
}
