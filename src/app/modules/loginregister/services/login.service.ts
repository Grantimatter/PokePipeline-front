import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../../DesignPatterns/service';
import { UserModel } from 'src/app/Models/User/UserModel';
import { BasicValidationService } from 'src/app/GlobalServices/basic-validation.service';

@Injectable({ providedIn: 'root' })
export class LoginService
  implements Service<UserModel, Observable<HttpResponse<Object>>> {
  private httpService: HttpClient;
  private httpHeaders: HttpHeaders;

  constructor(
    private injectedHttpClient: HttpClient,
    private validationService: BasicValidationService
  ) {
    this.httpService = injectedHttpClient;

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

  provideService(arg: UserModel): Observable<HttpResponse<Object>> {
    return this.httpService.get('/api/login', {
      headers: this.httpHeaders,
      observe: 'response',
      responseType: 'json',
    });
  }
}
