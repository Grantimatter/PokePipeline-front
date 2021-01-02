import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { UserModel } from 'src/app/models/user';
import { PartyService } from '../../services/party/party.service';

@Component({
  selector: 'app-option-screen',
  templateUrl: './option-screen.component.html',
  styleUrls: ['./option-screen.component.css']
})
export class OptionScreenComponent implements OnInit {

  hasParty:boolean = false;
  isDisabledChoosePokemon:boolean = true;

  trainer:UserModel = {
    "username": "Trainer",
    "password": "pass",
    "email": "trainer@gmail.com",
    "description": "Pokemon Master (in training)",
    "profilePicture": null
  };

  constructor(private partyService:PartyService,) { }

  ngOnInit(): void {
    this.getPokemonFromService();
  }

  setDisabled() {
    this.isDisabledChoosePokemon = true;
  }

  getPokemonFromService() {
    let pokemon = this.partyService.getPokemon1();
    if (pokemon == null) this.isDisabledChoosePokemon = false;
    else this.isDisabledChoosePokemon = true;
  }

}
