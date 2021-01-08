import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Service } from 'src/app/interfaces/service';
import { LoggedOutGuardService } from '../guards/logged.out.guard.service';
import { authAPIendpoint } from 'src/environments/environment';
import { PokeApiHelperService } from 'src/app/modules/pokemon-utility/services/pokemon-api-helper/poke-api-helper.service';

/** This service pings the back end and icnludes the trainers JSESSIONID cookie in the request.
 * Doing so, the server can verify whether or not the trainer is valid trainer.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authenticated: boolean;
  private authListener: Subject<HttpResponse<Object>>;
  private static readonly loggedOutToken: string = 'X1333a1344544ssf';
  private endPoint: string;

  httpService: HttpClient;
  constructor(private injectedHttpService: HttpClient, private apiHelperService:PokeApiHelperService) {
    this.httpService = injectedHttpService;
    this.authListener = new Subject<HttpResponse<Object>>();
    this.authenticated = false;
    this.endPoint = authAPIendpoint;
  }

  /** This function pings the servers auth filter. The response will be delivered by the observable.
   * @returns Observable<HttpResponse<Object>> an observable which will deliver the servers response to the authentication
   * request. A 200 status code means the trainer may pass, anything else indicates the trainermay not pass.
   */
  public provideService(): Observable<boolean> {
    let serviceListener: Subject<boolean> = new Subject<boolean>();

    this.httpService
      .get(this.endPoint, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe(
        (resp) => {
          //do not render logged out routes since log in was succesful/
          localStorage.setItem(
            AuthenticationService.loggedOutToken,
            '' + false
          );

          if(resp['body']['pokemonList'][0]) {
            this.apiHelperService.getTrainerPokemonWithSpecificMoves(resp['body']['pokemonList'][0]);
          }

          //this.injectedloggedOutGuardService.provideService(!isAuthenticated);
          serviceListener.next(true);
        },
        (err) => {
          //return false to listener and activate the logged out guards.
          serviceListener.next(false);
          localStorage.setItem(AuthenticationService.loggedOutToken, '' + true);
        }
      );

    return serviceListener.asObservable();
  }
}
