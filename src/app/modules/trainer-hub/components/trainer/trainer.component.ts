import { Component, OnInit } from '@angular/core';
import { TrainerModel } from 'src/app/models/trainer';
import { faUser, faUpload } from '@fortawesome/free-solid-svg-icons';
import { TrainerService } from '../../services/party/trainer.service';
import { LogoutService } from 'src/app/modules/authentication/services/logout/logout.service';

enum TrainerTemplateToRender {
  ProfileView,
  UpdateProfile,
  ChangePassword,
}

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  public RenderTemplate = TrainerTemplateToRender;
  //private userService: TrainerService;

  public CANNOT_UPDATE_FIELDS =
    ' There was some trouble updating your profile. Please try again.';
  public CANNOT_UPDATE_PASSWORD =
    ' Cant upate password. Make sure its non empty, and that you corectly confirm your password.';
  public trainerAccount: TrainerModel;
  public isLoading: boolean;
  public templateToRender: TrainerTemplateToRender;
  public faTrainer: any;

  public newPass: string;
  public confirmNewPass: string;

  private trainerService: TrainerService;
  private logoutService: LogoutService;

  public message: string = '';

  constructor(
    private injectedTrainerService: TrainerService,
    logOutService: LogoutService
  ) {
    this.logoutService = logOutService;
    this.trainerService = injectedTrainerService;
    this.trainerAccount = null;
    this.isLoading = true;
    this.faTrainer = faUser;
    this.trainerAccount = null;

    this.newPass = '';
    this.confirmNewPass = '';
  }

  private loadProfileFromDataBase(): void {
    this.trainerService.getTrainerProfile().subscribe(
      (profileData: TrainerModel) => {
        //what's returned from the database comes with a lot of data not needed for profile viewing, so I strip it here.
        let profileOnlyData: TrainerModel = new TrainerModel();
        profileOnlyData.readProfile(profileData);

        this.trainerAccount = profileOnlyData;
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

  public updateTrainerProfile(): void {
    this.trainerService.provideService(this.trainerAccount).subscribe(
      (success) => {
        this.loadProfileFromDataBase();
      },
      (err) => {
        this.message = this.CANNOT_UPDATE_FIELDS;
      }
    );
  }

  public updatePassword(): void {
    if (this.newPass != '' && this.newPass === this.confirmNewPass) {
      this.trainerAccount.password = this.newPass;
      this.trainerService.provideService(this.trainerAccount).subscribe(
        (success) => {
          this.loadProfileFromDataBase();
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
