import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoggedOutGuardService } from './logged.out.guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService implements CanActivate {
  private httpAuthService: AuthenticationService;
  private loggedOutGuardService: LoggedOutGuardService;
  constructor(
    private injectedAuthenticationService: AuthenticationService,
    injectedLoggedOutGuard: LoggedOutGuardService
  ) {
    this.httpAuthService = injectedAuthenticationService;
    this.loggedOutGuardService = injectedLoggedOutGuard;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let serviceListener: Subject<boolean> = new Subject<boolean>();

    this.httpAuthService.provideService().subscribe(
      (authSuccess) => {
        serviceListener.next(authSuccess);
      },
      (err) => {}
    );

    return serviceListener.asObservable();
  }
}
