class ProfileService {
  constructor($auth, $http, AppConstants ) {
    'ngInject';

    this._$auth = $auth;
    this._$http = $http;
    this.apiUrl = AppConstants.api + 'account';
  }

  get() {
    return this._$http.get(this.apiUrl, {json: true})
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error(res.status, res.statusText);
      });
  }

  update( fields ) {
    return this._$http.post(this.apiUrl, fields);
  }
}

export default ProfileService;
