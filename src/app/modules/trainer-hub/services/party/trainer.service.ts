import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Service } from 'src/app/interfaces/service';
import { TrainerModel } from 'src/app/models/trainer';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { Observable, Subject } from 'rxjs';
import { API } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TrainerService implements Service<TrainerModel, Observable<boolean>> {
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
  public provideService(trainerToUpdate: TrainerModel): Observable<boolean> {
    let listener: Subject<boolean> = new Subject<boolean>();
    let trainersProfileUpdate: TrainerModel = new TrainerModel();

    trainersProfileUpdate.readProfile(trainerToUpdate);

    if (this.validateServiceArgument(trainersProfileUpdate)) {
      this.http
        .post(this.serviceAPI.updateTrainerEndpoint, trainerToUpdate, {
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

  public validateServiceArgument(arg: TrainerModel) {
    return (
      this.validationService.isTruthyObject(arg) &&
      this.validationService.isTruthyString(arg.trainerName)
    );
  }

  public getTrainerProfile(): Observable<TrainerModel> {
    let trainerProfile: Subject<TrainerModel> = new Subject<TrainerModel>();

    this.http
      .post(this.serviceAPI.getTrainerEndpoint, null, {
        observe: 'response',
        responseType: 'json',
        withCredentials: true,
      })
      .subscribe(
        (response: HttpResponse<Object>) => {
          if (response.status == 200)
            trainerProfile.next(response.body as TrainerModel);
          else trainerProfile.error('Trainer is not authorized.');
        },
        (err) => {
          trainerProfile.error('Server or cors error.');
        }
      );

    return trainerProfile.asObservable();
  }

  public updatePassword(newPassword: string): Observable<boolean> {
    let returnObservable: Subject<boolean> = new Subject<boolean>();
    let passwordToken: TrainerModel;

    if (newPassword != null) {
      passwordToken = new TrainerModel();
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
