import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-option-screen',
  templateUrl: './option-screen.component.html',
  styleUrls: ['./option-screen.component.css']
})
export class OptionScreenComponent implements OnInit {

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

}
