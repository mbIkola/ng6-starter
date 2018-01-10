class JWT {

  constructor(AppConstants, $window) {
    'ngInject';

    this.storage = $window.localStorage;
    this.tokenKey = AppConstants.jwtKey;
    this.currentToken = null;

  }

  get() {
    if ( ! this.currentToken ) {
      this.currentToken = this.storage.get(this.tokenKey);
    }
    return this.currentToken;
  }
  set(token) {
    this.currentToken = token;
    this.storage.setItem(this.tokenKey, token);
  }
  remove() {
    this.currentToken = null;
    this.storage.removeItem(this.tokenKey);
  }

}

export default JWT;
