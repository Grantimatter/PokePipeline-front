import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Service } from 'src/app/interfaces/service';
import { LoggedOutGuardService } from '../guards/logged.out.guard.service';

/** This service pings the back end and icnludes the users JSESSIONID cookie in the request.
 * Doing so, the server can verify whether or not the user is valid user.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authenticated: boolean;
  private authListener: Subject<HttpResponse<Object>>;
  private static readonly loggedOutToken: string = 'X1333a1344544ssf';

  httpService: HttpClient;
  constructor(private injectedHttpService: HttpClient) {
    this.httpService = injectedHttpService;
    this.authListener = new Subject<HttpResponse<Object>>();
    this.authenticated = false;
  }

  /** This function pings the servers auth filter. The response will be delivered by the observable.
   * @returns Observable<HttpResponse<Object>> an observable which will deliver the servers response to the authentication
   * request. A 200 status code means the user may pass, anything else indicates the usermay not pass.
   */
  public provideService(): Observable<boolean> {
    let serviceListener: Subject<boolean> = new Subject<boolean>();

    this.httpService
      .get('http://localhost:8080/PokePipeline/auth', {
        observe: 'response',
        withCredentials: true,
        responseType: 'text',
      })
      .subscribe(
        (resp) => {
          let isAuthenticated = resp.status == 200;
          localStorage.setItem(
            AuthenticationService.loggedOutToken,
            '' + !isAuthenticated
          );
          //this.injectedloggedOutGuardService.provideService(!isAuthenticated);
          serviceListener.next(isAuthenticated);
        },
        (err) => {
          //this.injectedloggedOutGuardService.provideService(true);
          serviceListener.next(false);
          localStorage.setItem(AuthenticationService.loggedOutToken, '' + true);
        }
      );

    return serviceListener.asObservable();
  }
}