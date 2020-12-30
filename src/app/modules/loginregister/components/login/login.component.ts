import { Component } from '@angular/core';
import { LoginService } from 'src/app/modules/loginregister/services/login.service';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { UserModel } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private static readonly INCORRECT_CREDENTIALS_MESSAGE: string =
    "We couldn't find that username and password combination.";
  private static readonly INVALID_CREDENTIALS_MESSAGE: string =
    'Please enter a non empty username and password combination.';

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
    this.validUsrPassCombo = false;
  }

  public logIn(): void {
    let requestTemplate: Observable<Object>;

    this.validUsrPassCombo = this.logInService.validateServiceArgument(
      this.userModel
    );

    if (this.validUsrPassCombo) {
      requestTemplate = this.logInService.provideService(this.userModel);
    } else {
      this.userMessage = LoginComponent.INVALID_CREDENTIALS_MESSAGE;
    }
  }

  private subscribeToLoginObservable(loginRequestTemplate: Observable<Object>) {
    if (this.validationService.isTruthyObject(loginRequestTemplate)) {
      // define next, error, and completion callbacks for the observable subscription
      loginRequestTemplate.subscribe(
        (response) => {},
        (error) => {},
        () => {}
      );
    }
  }
}
