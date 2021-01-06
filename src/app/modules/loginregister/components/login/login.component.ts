import { Component } from '@angular/core';
import { LoginService } from 'src/app/modules/loginregister/services/login.service';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { TrainerModel as TrainerModel } from 'src/app/models/trainer';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationGuardService } from 'src/app/modules/authentication/services/guards/authentication.guard.service';
import { Router } from '@angular/router';

/** This component is responsible for providing login View functionality. */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private static readonly INCORRECT_CREDENTIALS_MESSAGE: string =
    "We couldn't find that trainerName and password combination.";
  private static readonly INVALID_CREDENTIALS_MESSAGE: string =
    'Please enter a non empty trainerName and password combination.';
  private static readonly ERROR_MESSAGE =
    'There was an error in logging you in. Please try again.';

  private logInService: LoginService;
  private validationService: BasicValidationService;

  public trainerModel: TrainerModel;
  public trainerMessage: string;
  public validUsrPassCombo: boolean;
  /** The LoginComponent constructor accepts two injected services: The loginservice and
   * the Basicvalidation service for argument checking.
   */
  constructor(
    private injectedLoginService: LoginService,
    injectedAuthenticationGuard: AuthenticationGuardService,
    private injectedGlobalValidationService: BasicValidationService,
    private router: Router
  ) {
    injectedAuthenticationGuard.canActivate(null, null).subscribe((resp) => {
      if (resp) {
        router.navigate(['/account']);
      }
    });

    this.logInService = injectedLoginService;
    this.validationService = injectedGlobalValidationService;

    this.trainerModel = new TrainerModel();
    this.validUsrPassCombo = false;
  }

  public clearLogInForm(): void {
    this.trainerModel.trainerName = '';
    this.trainerModel.password = '';
    this.trainerMessage = '';
  }
  /** The loginmethod attempts to log a trainer in.  */
  public logIn(): void {
    let loginRequestTemplate: Observable<Object>;

    this.validUsrPassCombo = this.logInService.validateServiceArgument(
      this.trainerModel
    );

    if (this.validUsrPassCombo) {
      loginRequestTemplate = this.logInService.provideService(
        this.trainerModel
      );
      this.subscribeToLoginObservable(loginRequestTemplate);
    } else {
      this.trainerMessage = LoginComponent.INVALID_CREDENTIALS_MESSAGE;
    }
  }

  /**This method subscribes to a login observable which also triggers the dispatch of the login
   * request to the api.
   * @param loginRequestTemplate the observable which contains the template for the http request.
   */

  private subscribeToLoginObservable(
    loginRequestTemplate: Observable<Object>
  ): void {
    if (this.validationService.isTruthyObject(loginRequestTemplate)) {
      // define next, error, and completion callbacks for the observable subscription
      loginRequestTemplate.subscribe(
        (response) => {
          this.clearLogInForm();
          this.router.navigate(['']);
        },
        (error) => {
          // this is called in case of internal server error. A generic message
          //is displayed to the trainer.
          this.trainerMessage = LoginComponent.ERROR_MESSAGE;
        }
      );
    }
  }
}
