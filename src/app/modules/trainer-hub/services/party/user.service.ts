import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Service } from 'src/app/interfaces/service';
import { UserModel } from 'src/app/models/user';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { Observable, Subject } from 'rxjs';
import { API } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService implements Service<UserModel, Observable<boolean>> {
  private http: HttpClient;
  private validationService: BasicValidationService;
  private serviceAPI: any = API;

  constructor(
    private injectedClient: HttpClient,
    injectedValidationService: BasicValidationService
  ) {
    this.http = injectedClient;
    this.validationService = injectedValidationService;
  }
  public provideService(userToUpdate: UserModel): Observable<boolean> {
    let listener: Subject<boolean> = new Subject<boolean>();
    let usersProfileUpdate: UserModel = new UserModel();

    usersProfileUpdate.readProfile(userToUpdate);

    if (this.validateServiceArgument(usersProfileUpdate)) {
      this.http
        .post(this.serviceAPI.updateUserEndpoint, userToUpdate, {
          observe: 'response',
          responseType: 'json',
          withCredentials: true,
        })
        .subscribe(
          (resp) => {
            if (resp.status == 200) {
              listener.next(true);
            } else listener.next(false);
          },
          (err) => {
            listener.next(false);
          }
        );
    }
    return listener.asObservable();
  }

  public validateServiceArgument(arg: UserModel) {
    return (
      this.validationService.isTruthyObject(arg) &&
      this.validationService.isTruthyString(arg.username)
    );
  }

  public getUserProfile(): Observable<UserModel> {
    let userProfile: Subject<UserModel> = new Subject<UserModel>();

    this.http
      .post(this.serviceAPI.getUserEndpoint, null, {
        observe: 'response',
        responseType: 'json',
        withCredentials: true,
      })
      .subscribe(
        (response: HttpResponse<Object>) => {
          if (response.status == 200)
            userProfile.next(response.body as UserModel);
          else userProfile.error('User is not authorized.');
        },
        (err) => {
          userProfile.error('Server or cors error.');
        }
      );

    return userProfile.asObservable();
  }

  public updatePassword(newPassword: string): Observable<boolean> {
    let returnObservable: Subject<boolean> = new Subject<boolean>();
    let passwordToken: UserModel;

    if (newPassword != null) {
      passwordToken = new UserModel();
      passwordToken.password = newPassword;
      this.http
        .put(this.serviceAPI.updatePasswordEndpoint, passwordToken, {
          observe: 'response',
          responseType: 'json',
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            if (response.status == 200) returnObservable.next(true);
            else returnObservable.next(false);
          },
          (err) => returnObservable.next(false)
        );
    }

    return returnObservable.asObservable();
  }
}
