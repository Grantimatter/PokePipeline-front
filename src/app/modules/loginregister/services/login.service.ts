import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../../interfaces/service';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { TrainerModel } from 'src/app/models/trainer';
import { authAPIendpoint } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService implements Service<TrainerModel, Observable<Object>> {
  private httpService: HttpClient;
  private httpHeaders: HttpHeaders;
  private authEndpoint: string = authAPIendpoint;

  constructor(
    private injectedHttpClient: HttpClient,
    private validationService: BasicValidationService
  ) {
    this.httpService = injectedHttpClient;
    this.validationService = validationService;

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append('Content-Type', 'Application/Json');
  }

  validateServiceArgument(arg: TrainerModel): boolean {
    let validArgObject: boolean = this.validationService.isTruthyObject(arg);
    let validTrainername: boolean = false;
    let validPassword: boolean = false;

    if (validArgObject) {
      validTrainername = this.validationService.isTruthyString(arg.trainerName);
      validPassword = this.validationService.isTruthyString(arg.password);
    }

    return validArgObject && validTrainername && validPassword;
  }

  provideService(loginToken: TrainerModel): Observable<Object> {
    return this.httpService.post(authAPIendpoint, loginToken, {
      headers: this.httpHeaders,
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
    });
  }
}
