import { Injectable } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { UserModel } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { env } from 'process';

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
      validObjectFields =
        this.injectedValidationService.isTruthyString(
          userToRegister.username
        ) &&
        this.injectedValidationService.isTruthyString(
          userToRegister.password
        ) &&
        this.injectedValidationService.isTruthyString(userToRegister.email);

    return validObject && validObjectFields;
  }

  provideService(userToRegister: UserModel): Observable<Object> {
    let headers: HttpHeaders = new HttpHeaders();

    return this.httpClient.post(
      `${environment.ec2Url}/register`,
      userToRegister,
      {
        responseType: 'json',
        observe: 'response',
      }
    );
  }
}
