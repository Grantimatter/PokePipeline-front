import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { TrainerModel } from 'src/app/models/trainer';
import { PartyService } from '../../services/party/party.service';

@Component({
  selector: 'app-option-screen',
  templateUrl: './option-screen.component.html',
  styleUrls: ['./option-screen.component.css'],
})
export class OptionScreenComponent implements OnInit {

  pokemon: Pokemon;
  isHidden:boolean = false;

  constructor(private partyService: PartyService) {
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
}
