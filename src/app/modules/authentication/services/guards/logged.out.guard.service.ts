import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuardService implements CanActivate {
  constructor() {
    localStorage.setItem(LoggedOutGuardService.loggedOutToken, 'false');
  }
  private static readonly loggedOutToken: string = 'X1333a1344544ssf';

  provideService(activateLoggedOutGuard: boolean) {
    localStorage.setItem(
      LoggedOutGuardService.loggedOutToken,
      activateLoggedOutGuard + ''
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isActivate: boolean =
      localStorage.getItem(LoggedOutGuardService.loggedOutToken) == 'true';
    return isActivate;
  }
}
