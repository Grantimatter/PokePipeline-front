import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../../interfaces/service';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { UserModel } from 'src/app/models/user';

@Injectable({ providedIn: 'root' })
export class LoginService implements Service<UserModel, Observable<Object>> {
  private httpService: HttpClient;
  private httpHeaders: HttpHeaders;

  constructor(
    private injectedHttpClient: HttpClient,
    private validationService: BasicValidationService
  ) {
    this.httpService = injectedHttpClient;
    this.validationService = validationService;

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append('Content-Type', 'Application/Json');
  }

  validateServiceArgument(arg: UserModel): boolean {
    let validArgObject: boolean = this.validationService.isTruthyObject(arg);
    let validUsername: boolean = false;
    let validPassword: boolean = false;

    if (validArgObject) {
      validUsername = this.validationService.isTruthyString(arg.username);
      validPassword = this.validationService.isTruthyString(arg.password);
    }

    return validArgObject && validUsername && validPassword;
  }

  provideService(loginToken: UserModel): Observable<Object> {
    return this.httpService.post(
      'http://localhost:8080/PokePipeline/login',
      loginToken,
      {
        headers: this.httpHeaders,
        observe: 'response',
        responseType: 'json',
        withCredentials: true,
      }
    );
  }
}
