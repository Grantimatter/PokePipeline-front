import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuardService implements CanActivate {
  constructor(private httpAuthService: AuthenticationService) {
    localStorage.setItem(LoggedOutGuardService.loggedOutToken, 'false');
  }
  private static readonly loggedOutToken: string = 'X1333a1344544ssf';

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isActivate: boolean =
      localStorage.getItem(LoggedOutGuardService.loggedOutToken) == 'true';
    return isActivate;
  }
}
