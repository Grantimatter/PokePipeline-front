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

  isDisabledChoosePokemon:boolean = true;
  isDisabledBattleButton:boolean = true;
  private _subscription_user_name:any;
  pokemon:Pokemon;

  trainer:UserModel = {
    "username": "Trainer",
    "password": "pass",
    "email": "trainer@gmail.com",
    "description": "Pokemon Master (in training)",
    "profilePicture": null
  };

  constructor(private partyService:PartyService,) { 
    this._subscription_user_name = this.partyService.pokemon1.subscribe((value) => {
      this.pokemon = value;
    })
  }

  ngOnInit(): void {
    this.getPokemonFromService();
  }

  setDisabled() {
    this.isDisabledBattleButton = false;
    this.isDisabledChoosePokemon = true;
  }

  resetChoosePokemon() {
    this.isDisabledChoosePokemon = false;
  }

  getPokemonFromService() {
    this.pokemon = this.partyService.getPokemon1();
    if (this.pokemon == null) this.isDisabledChoosePokemon = false;
    else this.isDisabledChoosePokemon = true;
  }

}
