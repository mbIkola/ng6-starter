class ProfileController {
  constructor($scope, toastr, $translate, Profile) {
    'ngInject';

    this.name = 'profile';

    this._$scope = $scope;
    this._toastr = toastr;
    this._$translate = $translate;

    this._profile = Profile;
    this.user = null;

  }
  $onInit() {
    this._profile.get().then(userInfo => {

      // this._$scope.email = userInfo.email;
      // this._$scope.firstname = userInfo.firstname;
      // this._$scope.lastname = userInfo.lastname;
      // this._$scope.phone = userInfo.phone;
      this._$scope.notifications = Object.assign({
        profile_changed: false,
        unusual_login: false,
        report_weekly: false,
        report_daily: false
      } , userInfo.notifications);

      this._$scope.user = userInfo;

      this.user = userInfo;
    });
  }

  onGeneralInformationUpdated() {
    this._profile.update(this.user).then( (res) => {
        this._toastr.success( "Updated ");
        this._$scope.general_information.$setPristine();
      }
    ).catch(err => {
      this._toastr.error("Fatal "+err);
    });
  }

  onPasswordChanged() {
    this._profile.update( { password: this._$scope.password } ).then((res) =>{
      this._toastr.success("Password changed");
      this._$scope.change_password_form.$setPristine();
      this._$scope.password = this._$scope.password_confirm = "";
    }).catch(err => {
      this._toastr.error("Could not change password due to server error:" + err);
    });
  }

  onNotificationSettingsChanged() {
    this._profile.update( { notifications: this._$scope.notifications }).then( (res) => {
        this._toastr.success( "Updated Notification Settings", res);
      }
    ).catch(err => {
      this._toastr.error("Fatal "+err);
    });
  }
}

export default ProfileController;
