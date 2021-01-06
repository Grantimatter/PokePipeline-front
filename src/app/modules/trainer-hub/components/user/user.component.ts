import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { faUser, faUpload } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/party/user.service';
import { LogoutService } from 'src/app/modules/authentication/services/logout/logout.service';

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

  public CANNOT_UPDATE_FIELDS =
    ' There was some trouble updating your profile. Please try again.';
  public CANNOT_UPDATE_PASSWORD =
    ' Cant upate password. Make sure its non empty, and that you corectly confirm your password.';
  public userAccount: UserModel;
  public isLoading: boolean;
  public templateToRender: UserTemplateToRender;
  public faUser: any;

  public newPass: string;
  public confirmNewPass: string;

  private userService: UserService;
  private logoutService: LogoutService;

  public message: string = '';

  constructor(
    private injectedUserService: UserService,
    logOutService: LogoutService
  ) {
    this.logoutService = logOutService;
    this.userService = injectedUserService;
    this.userAccount = null;
    this.isLoading = true;
    this.faUser = faUser;
    this.userAccount = null;

    this.newPass = '';
    this.confirmNewPass = '';
  }

  private loadProfileFromDataBase(): void {
    this.userService.getUserProfile().subscribe(
      (profileData: UserModel) => {
        //what's returned from the database comes with a lot of data not needed for profile viewing, so I strip it here.
        let profileOnlyData: UserModel = new UserModel();
        profileOnlyData.readProfile(profileData);

        this.userAccount = profileOnlyData;
        this.renderProfile();
      },
      (err) => {
        //log the user out in case of server error.
        this.logoutService.provideService();
      }
    );
  }

  ngOnInit(): void {
    //attempt to get user profile
    this.loadProfileFromDataBase();
    this.templateToRender = this.RenderTemplate.ProfileView;
  }

  public updateUserProfile(): void {
    this.userService.provideService(this.userAccount).subscribe(
      (success) => {
        if (success) {
          this.loadProfileFromDataBase();
        } else {
          this.message = this.CANNOT_UPDATE_FIELDS;
        }
      },
      (err) => {
        this.message = this.CANNOT_UPDATE_FIELDS;
      }
    );
  }

  public updatePassword(): void {
    if (this.newPass != '' && this.newPass === this.confirmNewPass) {
      this.userService.updatePassword(this.newPass).subscribe(
        (success) => {
          if (success) {
            this.loadProfileFromDataBase();
          } else {
            this.message = this.CANNOT_UPDATE_PASSWORD;
          }
        },
        (err) => {
          this.message = this.CANNOT_UPDATE_PASSWORD;
        }
      );
    } else {
      this.message = this.CANNOT_UPDATE_PASSWORD;
    }
  }

  public renderUpdatePassword(): void {
    this.templateToRender = this.RenderTemplate.ChangePassword;
  }

  public renderProfile(): void {
    this.message = '';
    this.templateToRender = this.RenderTemplate.ProfileView;
  }

  public renderUpdateAccount(): void {
    this.templateToRender = this.RenderTemplate.UpdateProfile;
  }
}
