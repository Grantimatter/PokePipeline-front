import { Component, OnInit } from '@angular/core';
import { TrainerModel } from 'src/app/models/trainer';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TrainerService } from '../../services/trainer.service';
import { LogoutService } from 'src/app/modules/authentication/services/logout/logout.service';

enum TrainerTemplateToRender {
  ProfileView,
  UpdateProfile,
  ChangePassword,
  LoadingView,
}

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  public RenderTemplate = TrainerTemplateToRender;

  public CANNOT_UPDATE_FIELDS =
    ' There was some trouble updating your profile. Please try again.';
  public CANNOT_UPDATE_PASSWORD =
    ' Cant upate password. Make sure its non empty, and that you corectly confirm your password.';
  public trainerAccount: TrainerModel;
  public isLoading: boolean;
  public templateToRender: TrainerTemplateToRender;
  public faSpinner: any;

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
    this.isLoading = true;
    this.faSpinner = faSpinner;
    this.trainerAccount = new TrainerModel();
    this.newPass = '';
    this.confirmNewPass = '';
  }

  private loadProfileFromDataBase(): void {
    this.trainerService.getTrainerProfile().subscribe(
      (profileData: TrainerModel) => {
        this.trainerAccount = profileData;
        this.templateToRender = this.RenderTemplate.ProfileView;
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
    this.templateToRender = this.RenderTemplate.LoadingView;
  }

  public updateTrainerProfile(): void {
    this.templateToRender = this.RenderTemplate.LoadingView;
    let updateJson: any = {
      email: this.trainerAccount.email,
      description: this.trainerAccount.description,
    };
    this.trainerService.updateProfile(updateJson).subscribe(
      (success) => {
        this.loadProfileFromDataBase();
      },
      (err) => {
        this.message = this.CANNOT_UPDATE_FIELDS;
        this.logoutService.provideService();
      }
    );
  }

  public updatePassword(): void {
    let passwordObj: any = null;
    if (this.newPass != '' && this.newPass === this.confirmNewPass) {
      this.templateToRender = this.RenderTemplate.LoadingView;

      passwordObj = { password: this.newPass };
      this.trainerAccount.password = this.newPass;
      this.trainerService.updateProfile(passwordObj).subscribe(
        (success) => {
          this.newPass = '';
          this.confirmNewPass = '';
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

  public triggerRerender(): any {
    let newProfileObject = Object.assign(this.trainerAccount, {});
    return newProfileObject;
  }
  public renderUpdatePassword(): void {
    this.templateToRender = this.RenderTemplate.ChangePassword;
  }

  public renderProfile(): void {
    this.templateToRender = this.RenderTemplate.LoadingView;
    this.loadProfileFromDataBase();
  }

  public renderUpdateAccount(): void {
    this.templateToRender = this.RenderTemplate.UpdateProfile;
  }

  private renderLoadingView() {
    this.templateToRender = this.RenderTemplate.LoadingView;
  }
}
