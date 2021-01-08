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
