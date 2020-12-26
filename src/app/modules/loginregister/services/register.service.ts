import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/Models/User/UserModel';
import { Service } from 'src/app/DesignPatterns/service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicValidationService } from 'src/app/GlobalServices/basic-validation.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService implements Service<UserModel, Observable<Object>> {
  private validationService: BasicValidationService;
  private httpClient: HttpClient;
  constructor(
    private injectedValidationService: BasicValidationService,
    private injectedHttpService: HttpClient
  ) {
    this.validationService = injectedValidationService;
    this.httpClient = injectedHttpService;
  }
  validateServiceArgument(userToRegister: UserModel): boolean {
    let validObject: boolean = this.injectedValidationService.isTruthyObject(
      userToRegister
    );
    let validObjectFields: boolean = false;

    if (validObject)
      validObjectFields = this.injectedValidationService.isTruthyObject(
        userToRegister.password
      );

    return validObject && validObjectFields;
  }
  provideService(arg: UserModel): Observable<Object> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post('/api/user/register', {
      body: JSON.stringify(arg),
      headers: headers,
      responseType: 'json',
      observe: 'response',
    });
  }
}
