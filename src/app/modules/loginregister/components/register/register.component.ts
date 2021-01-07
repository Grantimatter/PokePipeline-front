import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { Observable } from 'rxjs';
import { TrainerModel } from 'src/app/models/trainer';
import { HttpResponse } from '@angular/common/http';

/** This components sends a registration request to the backend */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private static readonly INVALID_REGISTRATION_FIELDS: string =
    'Username,password, and email are required to register.';
  private static readonly REGISTRATION_FAILED: string =
    'Your registration failed. Your username or email may be taken.';
  private static readonly SERVER_ERROR: string =
    'There was an error signing up. Please try again later.';

  private registerService: RegisterService;
  private validationService: BasicValidationService;

  public validRegistratonFields: boolean;
  public warningMessage: string;

  /**The constructor accepts two  injected parameters.
   * @param injectedRegisterService this service is responsible for dispatching registration requests.
   * @param injectedValidationService this service is responsible for validating user input.
   */
  public trainerToRegister: TrainerModel;
  constructor(
    private injectedRegisterService: RegisterService,
    private injectedValidationService: BasicValidationService
  ) {
    this.registerService = injectedRegisterService;
    this.validationService = injectedValidationService;
    this.trainerToRegister = new TrainerModel();
    this.validRegistratonFields = false;
    this.warningMessage = '';
  }

  ngOnInit(): void {}

  /** This method validates user input and attempts to register them to the back end, if basic
   * validation is based. I.e, username, password, and email are not empty.
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
        //cast to httpreponse for intellisense
        let resp: HttpResponse<Object> = response as HttpResponse<Object>;

        if (resp.status == 200) {
          this.resetFormState();
          alert(
            'User succesfully registered. Redirect once auth guard in place.'
          );
        } else {
          this.warningMessage = RegisterComponent.INVALID_REGISTRATION_FIELDS;
        }
      },
      (err) => {
        this.warningMessage = RegisterComponent.SERVER_ERROR;
      }
    );
  }
}
