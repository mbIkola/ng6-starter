class Auth {
  constructor($auth) {
    'ngInject';

    this._$auth = $auth;
  }

  login( email, password) {
    return this._$auth.login({email, password}).then(res => res.data);
  }

  register(email, password) {
    // autologin after registration !
    // satellizer do not setToken() on register. Perhaps it waiting for some verification ?
    return this._$auth.signup( {email, password}).then(res => res.data);
  }
  authenticate(provider) {
    return this._$auth.authenticate(provider);
  }

  isAuthenticated() {
    return this._$auth.isAuthenticated();
  }

  logout() {
    this._$auth.logout();
  }

}

export default Auth;
