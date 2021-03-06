class SignupController {
  constructor(Auth, $state, $scope, toastr, $translate) {
    'ngInject';


    this._Auth = Auth;
    this._$state = $state;
    this.name = 'Sign Up';

    this._$scope = $scope;
    this._toastr = toastr;
    this._$translate = $translate;
  }

  signup() {
    console.log('sign up with data @' + this._$scope);
    this._Auth.register(this._$scope.email, this._$scope.password)
      .then((res) => {
        this._toastr.success(
          this._$translate.instant(
            'Thanks for signing up! An email has been sent to {{email}} with instructions for verifying your account. ',
            res.user
          )
        );
        this._$state.go('app.profile');
      });
  }
}

export default SignupController;
