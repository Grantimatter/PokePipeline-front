import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserModel } from 'src/app/models/user';

import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  private userService: UserService;
  public userAccount: UserModel;
  public isLoading: boolean;
  public faUser: any;

  constructor(private injectedUserService: UserService) {
    this.userService = injectedUserService;
    this.userAccount = null;
    this.isLoading = true;
    this.faUser = faUser;
    this.userAccount = new UserModel();
    this.userAccount.username = 'Ash ketchum';
    this.userAccount.email = 'Ash@pokemon.com';
    this.userAccount.description =
      'Hi, my name is ash im from pallet town. my favorite pokemon is pikachu. I want to catch them all.';
  }

  ngOnInit(): void {}
}
