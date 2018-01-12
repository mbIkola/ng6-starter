class ApiKeysService {


  constructor($http, AppConstants) {
    'ngInject';

    this.apiUrl = AppConstants.api + 'apikeys';
    this.$http = $http;
  }

  get() {
    return this.$http.get(this.apiUrl, {json: true})
      .then((res) => {
        if ( res.status === 200 ) {
          return res.data;
        }
        throw new Error(res.status, res.statusText);
      });
  }

  delete(key) {
    var uri = this.apiUrl + '/' + key;
    console.log(uri);
    return this.$http.delete(uri);
  }
  create(key) {
    return this.$http.put(this.apiUrl, key, {json: true}).then( res => res.data );
  }
  update(key) {
    return this.$http.post(this.apiUrl + '/' + key.key, key, {json: true})
      .then((res) => res.data );
  }
}

export default ApiKeysService;
