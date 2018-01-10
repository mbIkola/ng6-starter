

class SocialSigninController {
  constructor(Auth, $state, $scope, toastr, $translate) {
    'ngInject';


    this._Auth = Auth;
    this._$state = $state;
    this._toastr = toastr;
    this._$translate = $translate;

    this._$scope = $scope;
  }

  authSocial(provider) {
    this._Auth.authenticate(provider)
      .then( res => res.data )
      .then((res) => {
        console.log(res, res.user, res.user.displayName);
        this._toastr.success(

          this._$translate.instant(
            'welcome-back',
            res.user
          )
        );
        this._$state.go('app.profile');
      }).catch((err) => {
        if ( err.name === "SyntaxError") {
          debugger;
        }
        if ( err.message === "The popup window was closed" ) {
          // do nothing except tracking throug GA.
        }  else {
          console.error("Social login error", err);
          throw err;
        }

        //this._toastr.error( this._$translate.instant('Login Error'));
      });
  }
}

export default SocialSigninController;
