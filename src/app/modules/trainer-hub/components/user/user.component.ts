import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { faUser, faUpload } from '@fortawesome/free-solid-svg-icons';

enum UserTemplateToRender {
  ProfileView,
  UpdateProfile,
  ChangePassword,
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public RenderTemplate = UserTemplateToRender;
  //private userService: UserService;
  public userAccount: UserModel;
  public isLoading: boolean;
  public templateToRender: UserTemplateToRender;
  public faUser: any;
  public faUpload: any;

  constructor() {
    // this.userService = injectedUserService;
    this.faUpload = faUpload;
    this.userAccount = null;
    this.isLoading = true;
    this.faUser = faUser;
    this.userAccount = new UserModel();
    this.userAccount.username = 'Ash ketchum';
    this.userAccount.email = 'Ash@pokemon.com';
    this.userAccount.description =
      'Hi, my name is ash im from pallet town. my favorite pokemon is pikachu. I want to catch them all.';
  }

  ngOnInit(): void {
    this.templateToRender = this.RenderTemplate.ProfileView;
  }

  public renderUpdatePassword(): void {
    this.templateToRender = this.RenderTemplate.ChangePassword;
  }

  public renderProfile(): void {
    this.templateToRender = this.RenderTemplate.ProfileView;
  }

  public renderUpdateAccount(): void {
    this.templateToRender = this.RenderTemplate.UpdateProfile;
  }
}
