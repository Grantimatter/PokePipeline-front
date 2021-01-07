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
  private _subscription_user_name: any;
  pokemon: Pokemon;

  trainer: TrainerModel = {
    trainerName: 'Trainer',
    password: 'pass',
    email: 'trainer@gmail.com',
    description: 'Pokemon Master (in training)',
    profilePicture: null,
  };

  constructor(private partyService: PartyService) {
    this._subscription_user_name = this.partyService.pokemon1.subscribe(
      (value) => {
        this.pokemon = value;
      }
    );
  }

  ngOnInit(): void {
    this.getPokemonFromService();
  }

  getPokemonFromService() {
    this.pokemon = this.partyService.getPokemon1();
  }
}
