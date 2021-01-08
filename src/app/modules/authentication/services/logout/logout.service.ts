import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/interfaces/service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogoutService implements Service<void, Observable<null>> {
  private httpClient: HttpClient;
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
      .put(`${environment.ec2Url}/auth`, null, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe(
        (resp) => {
          localStorage.setItem(LogoutService.loggedOutToken, true + '');
          this.router.navigate(['']);
        },
        (err) => {
          localStorage.setItem(LogoutService.loggedOutToken, true + '');
          this.router.navigate(['']);
        }
      );

    return returnObservable.asObservable();
  }
}
