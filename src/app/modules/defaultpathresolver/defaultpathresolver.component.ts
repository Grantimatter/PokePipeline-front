import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedOutGuardService } from '../authentication/services/guards/logged.out.guard.service';
import { AuthenticationService } from '../authentication/services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { inject } from '@angular/core/testing';

/**This component forwards the trainer to the appropriate view, depending on if they're logged in or not. If the app finds they are logged in,
 * the trainer is forwarded to the trainer dashboard; otherwise, the trainer is forwarded to login.
 */
@Component({ template: '' })
export class DefaultpathresolverComponent implements OnChanges, OnInit {
  /**
   * The constructor performs the forwarding function of this placeholder component. We want it to occur as soon as possible to make
   * the transition as seamless as possible.
   * @params injectedRouter Angular's supplied router which will perform view forwarding
   * @params injectedLoggedOutGuard the loggedOutRouteguard for this app. It is the quickest way of deciding which view to forward to as it
   * does not involve any network requests. As a result the forward is not perceptable to the trainer.
   */

  private router: Router;
  private isAuthenticated: boolean | null;
  constructor(
    private injectedRouter: Router,
    injectedAuthService: AuthenticationService
  ) {
    this.router = injectedRouter;
    this.isAuthenticated = null;
    injectedAuthService.provideService().subscribe(
      (authenticatedBoolean) => {
        this.isAuthenticated = authenticatedBoolean;
        this.navigateToAppropriateView();
      },
      (err) => {
        this.isAuthenticated = false;
        this.navigateToAppropriateView();
      },
      () => {
        this.navigateToAppropriateView();
      }
    );
  }
  //Whenever the component is initialized,
  ngOnInit(): void {
    this.navigateToAppropriateView();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  private navigateToAppropriateView(): void {
    if (!this.isAuthenticated) this.router.navigate(['login']);
    else this.router.navigate(['trainerhub']);
  }
}
