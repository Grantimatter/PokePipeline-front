import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticationService } from './modules/authentication/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'PokePipeline';

  public constructor(
    private injectedAuthService: AuthenticationService,
    injectedApplicationRouter: Router
  ) {}
  /**ngOnInit checks if the user is authenticated, as users may close their browser window while being in possesion of
   * a valid JSESSIONID cookie. For these cases, we use ngOnInit in an attempt to authenticate them. If they have a valid,
   * JSESSIONID cookie, then the authenticated site view will presented to them.
   */
  ngOnInit(): void {}

  ngOnChanges(): void {}
}
