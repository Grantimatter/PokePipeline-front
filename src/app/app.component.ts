import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticationService } from './modules/authentication/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PokePipeline';

  public constructor() {}
}
