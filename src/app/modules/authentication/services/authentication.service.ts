import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service';

/** This service pings the back end and icnludes the users JSESSIONID cookie in the request.
 * Doing so, the server can verify whether or not the user is valid user.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpService: HttpClient;
  constructor(private injectedHttpService: HttpClient) {
    this.httpService = injectedHttpService;
  }

  /** This function pings the servers auth filter. The response will be delivered by the observable.
   * @returns Observable<HttpResponse<Object>> an observable which will deliver the servers response to the authentication
   * request. A 200 status code means the user may pass, anything else indicates the usermay not pass.
   */
  provideService(): Observable<HttpResponse<Object>> {
    return this.httpService.get('http://localhost:8080/auth', {
      observe: 'response',
      withCredentials: true,
      responseType: 'text',
    });
  }
}
