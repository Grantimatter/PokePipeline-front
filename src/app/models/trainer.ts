class TrainerModel {
  trainerName?: string;
  password?: string;
  email?: string;
  description?: string;
  profilePicture?: string;

  public constructor() {}

  /**This function is used to build a profile only model view of the trainer data sent from the back end.  */

  public readProfile(profileInfo: TrainerModel): void {
    this.trainerName = profileInfo.trainerName;
    this.description = profileInfo.description;
    this.email = profileInfo.email;
    this.profilePicture = profileInfo.profilePicture;
  }
}

export { TrainerModel };
