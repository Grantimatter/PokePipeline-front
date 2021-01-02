import { Component, OnInit } from '@angular/core';
import { TrainerHubComponent } from './../../modules/trainer-hub/components/trainer-hub/trainer-hub.component';
import { LogoutService } from 'src/app/modules/authentication/services/logout/logout.service';
import { LoggedOutGuardService } from 'src/app/modules/authentication/services/guards/logged.out.guard.service';

@Component({
  selector: 'app-temp-nav-bar',
  templateUrl: './temp-nav-bar.component.html',
  styleUrls: ['./temp-nav-bar.component.css'],
})
export class TempNavBarComponent implements OnInit {
  private logoutService: LogoutService;
  constructor(private injectedLogoutService: LogoutService) {
    this.logoutService = injectedLogoutService;
  }

  ngOnInit(): void {}

  public logout(): void {
    this.logoutService.provideService().subscribe();
  }
}
