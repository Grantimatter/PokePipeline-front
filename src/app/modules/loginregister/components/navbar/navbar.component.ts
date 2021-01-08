import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'log-reg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class LogRegNavbar {
  private currentPath: string;
  public adjacentRoute: string;
  public adjacentRouteHrefText: string;
  public adjacentRouteButtonClass: string;

  constructor(private activeRoute: ActivatedRoute) {
    /* let undefinedRouteSnapshot: boolean =
      activeRoute.snapshot.url[0] == undefined;

    let currentPathIsLogin: string =
      activeRoute.snapshot.url[0].path == 'login'
        ? ''
        : activeRoute.snapshot.url[0].path;
    let navigatedToLoginPath: boolean = currentPathIsLogin === '';

    this.adjacentRoute = navigatedToLoginPath ? 'register' : '';
    this.adjacentRouteHrefText = navigatedToLoginPath ? 'Register' : 'Login';
    this.adjacentRouteButtonClass = !navigatedToLoginPath
      ? 'btn btn-warning'
      : 'btn btn-primary';*/

    if (
      activeRoute.snapshot.url[0] == undefined ||
      activeRoute.snapshot.url[0].path == 'login'
    ) {
      this.adjacentRoute = 'register';
      this.adjacentRouteHrefText = 'Register';
      this.adjacentRouteButtonClass = 'btn btn-primary';
    } else {
      this.adjacentRoute = 'login';
      this.adjacentRouteHrefText = 'Login';
      this.adjacentRouteButtonClass = 'btn btn-warning';
    }
  }
}
