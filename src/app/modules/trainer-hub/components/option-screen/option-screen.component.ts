import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PartyService } from '../../services/party/party.service';
import { LogoutService } from 'src/app/modules/authentication/services/logout/logout.service';

@Component({
  selector: 'app-option-screen',
  templateUrl: './option-screen.component.html',
  styleUrls: ['./option-screen.component.css'],
})
export class OptionScreenComponent implements OnInit {
  pokemon: Pokemon;
  isHidden: boolean = false;
  private logoutService: LogoutService;

  constructor(
    private partyService: PartyService,
    private injectedlogoutService: LogoutService
  ) {
    this.logoutService = injectedlogoutService;
  }

  ngOnInit(): void {
    this.getPokemonFromService();
  }

  unHidePartyButton() {
    this.isHidden = false;
  }

  hidePartyButton() {
    this.isHidden = true;
  }

  getPokemonFromService() {
    this.pokemon = this.partyService.getPokemon1();
  }
  logOutOfTrainerHub(): void {
    this.logoutService.provideService();
  }
}
