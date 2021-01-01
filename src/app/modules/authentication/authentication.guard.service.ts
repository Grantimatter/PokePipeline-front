import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService implements CanActivate {
  private httpAuthService: AuthenticationService;
  constructor(private injectedAuthenticationService: AuthenticationService) {
    this.httpAuthService = injectedAuthenticationService;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //This subject will be converted to an observable
    let returnSubjectObservable: Subject<boolean> = new Subject<boolean>();

    this.httpAuthService.provideService().subscribe(
      (next: HttpResponse<Object>) => {
        //user authenticated, push true to subscribers
        if (next.status == 200) returnSubjectObservable.next(true);
        else returnSubjectObservable.next(false); //user did not auth, push false to subscribers
      },
      (err) => {
        returnSubjectObservable.next(false); //server error, push false. Cant authenticate.
      }
    );

    return returnSubjectObservable.asObservable(); //return observable view of subject.
  }
}
