import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { TrainerModel } from 'src/app/models/trainer';

@Component({
  selector: 'app-option-screen',
  templateUrl: './option-screen.component.html',
  styleUrls: ['./option-screen.component.css'],
})
export class OptionScreenComponent implements OnInit {
  hasParty: boolean = false;
  // set this to true when the pokemon dies, or trainer resets game
  isDisabled: boolean = false;

  trainer: any = {
    trainerName: 'Trainer',
    password: 'pass',
    email: 'trainer@gmail.com',
    description: 'Pokemon Master (in training)',
    profilePicture: null,
  };

  constructor() {}

  ngOnInit(): void {}

  choosingPokemon() {
    this.isDisabled = true;
  }
}
