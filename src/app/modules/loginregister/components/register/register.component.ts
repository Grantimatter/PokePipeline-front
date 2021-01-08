import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { Observable } from 'rxjs';
import { TrainerModel } from 'src/app/models/trainer';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

/** This components sends a registration request to the backend */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private static readonly INVALID_REGISTRATION_FIELDS: string =
    'Trainername,password, and email are required to register.';
  private static readonly REGISTRATION_FAILED: string =
    'Your registration failed. Your trainername or email may be taken.';
  private static readonly SERVER_ERROR: string =
    'There was an error signing up. Please try again later.';

  private registerService: RegisterService;
  private validationService: BasicValidationService;
  private loginService: LoginService;
  private router: Router;
  public validRegistratonFields: boolean;
  public warningMessage: string;

  /**The constructor accepts two  injected parameters.
   * @param injectedRegisterService this service is responsible for dispatching registration requests.
   * @param injectedValidationService this service is responsible for validating trainer input.
   */
  public trainerToRegister: TrainerModel;
  constructor(
    private injectedRegisterService: RegisterService,
    private injectedValidationService: BasicValidationService,
    private injectedRouter: Router
  ) {
    this.registerService = injectedRegisterService;
    this.validationService = injectedValidationService;
    this.trainerToRegister = new TrainerModel();
    this.validRegistratonFields = false;
    this.warningMessage = '';
    this.router = injectedRouter;
  }

  ngOnInit(): void {}

  /** This method validates trainer input and attempts to register them to the back end, if basic
   * validation is based. I.e, trainername, password, and email are not empty.
   */
  registerTrainer(): void {
    let registerRequestTemplate: Observable<Object>;

    if (
      this.injectedRegisterService.validateServiceArgument(
        this.trainerToRegister
      )
    ) {
      registerRequestTemplate = this.registerService.provideService(
        this.trainerToRegister
      );
      this.subscribeToRegisterRequestObservable(registerRequestTemplate);
    } else {
      this.warningMessage = RegisterComponent.INVALID_REGISTRATION_FIELDS;
    }
  }

  /**This method resets form state to an empty form.*/
  private resetFormState(): void {
    this.warningMessage = '';
    this.trainerToRegister = new TrainerModel();
  }
  /**This method subscribes to an observable generated by the http client and launches the request built
   * out by the observable to the back end.
   * @param httpRequestTemplate the registration request which should be executed.
   */
  private subscribeToRegisterRequestObservable(
    httpRequestTemplate: Observable<Object>
  ): void {
    httpRequestTemplate.subscribe(
      (response) => {
        this.resetFormState();
        this.router.navigate(['']);
      },
      (err) => {
        this.warningMessage = RegisterComponent.SERVER_ERROR;
      }
    );
  }
}
