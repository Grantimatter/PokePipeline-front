import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Service } from 'src/app/interfaces/service';
import { TrainerModel } from 'src/app/models/trainer';
import { BasicValidationService } from 'src/app/services/basicvalidation/basic-validation.service';
import { Observable, Subject } from 'rxjs';
import {
  authAPIendpoint,
  trainerAPIendpoint,
} from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TrainerService
  implements Service<TrainerModel, Observable<boolean>> {
  private http: HttpClient;
  private validationService: BasicValidationService;
  private authEndpoint: any = authAPIendpoint;
  private trainerEndpoint: any = trainerAPIendpoint;

  constructor(
    private injectedClient: HttpClient,
    injectedValidationService: BasicValidationService
  ) {
    this.http = injectedClient;
    this.validationService = injectedValidationService;
  }

  public updateProfile(json: any) {
    let listener: Subject<boolean> = new Subject<boolean>();

    if (
      (json.email !== null && json.email !== undefined && json.email != '') ||
      (json.password !== null &&
        json.password !== undefined &&
        json.password !== '')
    ) {
      this.http
        .put(this.trainerEndpoint, json, {
          observe: 'response',
          responseType: 'json',
          withCredentials: true,
        })
        .subscribe(
          (resp) => {
            listener.next(true);
          },
          (err) => listener.next(false)
        );
    }

    return listener.asObservable();
  }
  public provideService(trainerToUpdate: TrainerModel): Observable<boolean> {
    let listener: Subject<boolean> = new Subject<boolean>();

    if (this.validateServiceArgument(trainerToUpdate)) {
      this.http
        .put(this.trainerEndpoint, trainerToUpdate, {
          observe: 'response',
          responseType: 'json',
          withCredentials: true,
        })
        .subscribe(
          (resp) => {
            listener.next(true);
          },
          (err) => listener.next(false)
        );

      return listener.asObservable();
    }
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
      .get(this.authEndpoint, {
        observe: 'response',
        responseType: 'json',
        withCredentials: true,
      })
      .subscribe(
        (response: HttpResponse<Object>) => {
          trainerProfile.next(response.body as TrainerModel);
        },
        (err) => {
          trainerProfile.error('Need logout call here in get Trainer profile');
        }
      );

    return trainerProfile.asObservable();
  }
}
