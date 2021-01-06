class UserModel {
  username?: string;
  password?: string;
  email?: string;
  description?: string;
  profilePicture?: string;

  public constructor() {}

  /**This function is used to build a profile only model view of the user data sent from the back end.  */

  public readProfile(profileInfo: UserModel): void {
    this.username = profileInfo.username;
    this.description = profileInfo.description;
    this.email = profileInfo.email;
    this.profilePicture = profileInfo.profilePicture;
  }
}

export { UserModel };
