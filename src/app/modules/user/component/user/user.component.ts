import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  private userService: UserService;
  private userAccount: UserModel;
  public isLoading: boolean;

  constructor(private injectedUserService: UserService) {
    this.userService = injectedUserService;
    this.userAccount = null;
    this.isLoading = true;
  }

  ngOnInit(): void {}
}
