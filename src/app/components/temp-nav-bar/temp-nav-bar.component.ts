import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/modules/authentication/services/logout/logout.service';
import { LoggedOutGuardService } from 'src/app/modules/authentication/services/guards/logged.out.guard.service';

@Component({
  selector: 'app-temp-nav-bar',
  templateUrl: './temp-nav-bar.component.html',
  styleUrls: ['./temp-nav-bar.component.css'],
})
export class TempNavBarComponent implements OnInit {
  private logoutService: LogoutService;
  private loggedOutAuthGuardService: LoggedOutGuardService;
  constructor(
    private injectedLogoutService: LogoutService,
    private injectedLoggedOutAuthGuardServide: LoggedOutGuardService
  ) {
    this.loggedOutAuthGuardService = injectedLoggedOutAuthGuardServide;
    this.logoutService = injectedLogoutService;
  }

  ngOnInit(): void {}

  public logout(): void {
    this.logoutService.provideService().subscribe(
      (response) => {
        if (response.status == 200) {
          alert('success');
        } else {
          alert('fail');
        }
        this.loggedOutAuthGuardService.provideService(true);
      },
      (err) => {
        alert('error server');
        this.loggedOutAuthGuardService.provideService(true);
      }
    );
  }
}
