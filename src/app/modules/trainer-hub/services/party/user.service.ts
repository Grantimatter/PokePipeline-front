import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Service } from 'src/app/interfaces/service';
import { UserModel } from 'src/app/models/user';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { Observable, Subject } from 'rxjs';

/**
 * Holds the Trainer's party.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService
  implements Service<UserModel, Observable<boolean> {
  private http: HttpClient;
  private validationService: BasicValidationService;

  constructor(
    private injectedClient: HttpClient,
    injectedValidationService: BasicValidationService
  ) {
    this.http = injectedClient;
    this.validationService = injectedValidationService;
  }
  public provideService(arg: UserModel): Subject<boolean>|boolean {
    let listener: Subject<boolean> | boolean= new Subject<boolean>();
    let reqTemplate: Observable<HttpResponse<Object>> = null;

    if(this.provideService){
      reqTemplate = this.http.patch("/user/update", arg, {withCredentials:true, responseType:'json',observe:"response"})
    }
    return listener;
  }

  public validateServiceArgument(arg: UserModel) {
    return (
      this.validationService.isTruthyObject(arg) &&
      this.validationService.isTruthyString(arg.username) &&
      this.validationService.isTruthyString(arg.password)
    );
  }

  public getUserProfile(): Observable<UserModel> {
     this.http.get('/user/getprofile', {
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
    });
  }
}
