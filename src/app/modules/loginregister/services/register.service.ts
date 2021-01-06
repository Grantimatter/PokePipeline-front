import { Injectable } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { TrainerModel } from 'src/app/models/trainer';

@Injectable({
  providedIn: 'root',
})
export class RegisterService implements Service<TrainerModel, Observable<Object>> {
  private validationService: BasicValidationService;
  private httpClient: HttpClient;
  constructor(
    private injectedValidationService: BasicValidationService,
    private injectedHttpService: HttpClient
  ) {
    this.validationService = injectedValidationService;
    this.httpClient = injectedHttpService;
  }
  validateServiceArgument(trainerToRegister: TrainerModel): boolean {
    let validObject: boolean = this.injectedValidationService.isTruthyObject(
      trainerToRegister
    );
    let validObjectFields: boolean = false;

    if (validObject)
      validObjectFields =
        this.injectedValidationService.isTruthyString(
          trainerToRegister.trainerName
        ) &&
        this.injectedValidationService.isTruthyString(
          trainerToRegister.password
        ) &&
        this.injectedValidationService.isTruthyString(trainerToRegister.email);

    return validObject && validObjectFields;
  }

  provideService(trainerToRegister: TrainerModel): Observable<Object> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post(
      'http://localhost:8080/PokePipeline/register',
      trainerToRegister,
      {
        headers: headers,
        responseType: 'json',
        observe: 'response',
      }
    );
  }
}
