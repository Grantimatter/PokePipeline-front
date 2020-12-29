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
    let currentPath: string =
      activeRoute.snapshot.url[0] == undefined
        ? ''
        : activeRoute.snapshot.url[0].path;
    let navigatedToLoginPath: boolean = currentPath === '';

    this.adjacentRoute = navigatedToLoginPath ? 'register' : '';
    this.adjacentRouteHrefText = navigatedToLoginPath ? 'Register' : 'Login';
    this.adjacentRouteButtonClass = !navigatedToLoginPath
      ? 'btn btn-warning'
      : 'btn btn-primary';
  }
}
