import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-option-screen',
  templateUrl: './option-screen.component.html',
  styleUrls: ['./option-screen.component.css']
})
export class OptionScreenComponent implements OnInit {

  hasParty:boolean = false;
 // set this to true when the pokemon dies, or user resets game
  isDisabled:boolean = false;

  trainer:UserModel = {
    "username": "Trainer",
    "password": "pass",
    "email": "trainer@gmail.com",
    "description": "Pokemon Master (in training)",
    "profilePicture": null
  };

  constructor() { }

  ngOnInit(): void {
  }

  choosingPokemon() {
    this.isDisabled = true;
  }

}
