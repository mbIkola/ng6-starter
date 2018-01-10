class SigninController {
  constructor(Auth, $state, toastr, $translate) {
    'ngInject';

    this._Auth = Auth;
    this._$state = $state;
    this._toastr = toastr;
    this._$translate = $translate;
    this.name = 'Sign In';
    this.data = {
      email: undefined,
      password: undefined
    };
  }

  signin() {
    console.log("signin with credentials:" + this.data);
    this._Auth.login(this.data.email, this.data.password)
      .then((res) => {
        this._toastr.success(this._$translate.instant('welcome-back', res.user) );
        this._$state.go('app.profile');
      });
  }
}

export default SigninController;
