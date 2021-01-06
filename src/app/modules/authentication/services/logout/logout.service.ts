import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Service } from "src/app/interfaces/service";
import { Observable, Subject } from 'rxjs';
import { LoggedOutGuardService } from '../guards/logged.out.guard.service';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class LogoutService implements Service<void, Observable<null>> {
  private httpClient: HttpClient;
  private loggedOutAuthGuard: LoggedOutGuardService;
  private router: Router;
  private static readonly loggedOutToken: string = 'X1333a1344544ssf';

  constructor(
    private injectedHttpClient: HttpClient,
    private injectedRouter: Router
  ) {
    this.httpClient = injectedHttpClient;
    this.router = injectedRouter;
  }

  public provideService(arg: void): Observable<null> {
    let returnObservable: Subject<null> = new Subject<null>();

    this.httpClient
      .put(`${environment.ec2Url}/logout`, null, {
        observe: 'response',
        withCredentials: true
      })
      .subscribe(
        (resp) => {
          localStorage.setItem(LogoutService.loggedOutToken, true + '');
          this.router.navigate(['']);
        },
        (err) => {
          localStorage.setItem(LogoutService.loggedOutToken, true + '');
          this.router.navigate(['']);
        },
        () => {
          this.router.navigate(['']);
          localStorage.setItem(LogoutService.loggedOutToken, true + '');
        }
      );

    return returnObservable.asObservable();
  }
}
