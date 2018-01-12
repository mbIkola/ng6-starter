class ApikeysController {
  constructor($scope, $ngConfirm, ApiKeys, toastr) {
    'ngInject';

    this.name = 'apikeys';

    this._$scope = $scope;
    this.service = ApiKeys;
    this.toastr = toastr;

    $scope.apiKeys = [];
    $scope.apiTokens = [];

    $scope.addApiKey = (event, clickPlus ) => {
      if ( clickPlus || event.which === 13) {
        this.service.create($scope.newKeyName).then( (created) => {
          $scope.apiKeys.push(created);
          toastr.success( "New Key created");
        }).catch ( (err) => {
          console.error(err);
          toastr.error("Could not create new API Key: Internal Server Error");
        });
      }
    };

    $scope.confirm = (key) => {
      console.log({key});
      $ngConfirm({
        title: "Delete API Key?",
        content: "Are you sure you want to remove API Key " + key + "?",
        // autoClose: 'cancel|10000',
        backgroundDismiss: true,
        useBootstrap: true,
        buttons: {
          remove: {
            text: "Remove Key",
            btnClass: 'btn-danger',
            action: () => {
              this.removeKey(key);
            }
          },
          cancel : {
            text: "Cancel"
          }
        }
      });
    }

  }

  $onInit() {
    this.service.get().then( (keys) => {
      this._$scope.apiKeys = keys;
    });
  }

  removeKey(key) {
    let keyIndex = this._$scope.apiKeys.findIndex( (i) => i.key === key );
    if ( keyIndex < 0 ) {
      console.warn("Requested to delete non-existing key? ", key);
      return;
    }
    var keyToRemove = this._$scope.apiKeys[keyIndex];

    this._$scope.apiKeys.splice(keyIndex, 1);

    this.service.delete(key).then(() => {
      this.toastr.success("API Key " + keyToRemove.title + "(" + keyToRemove.key + ") removed" );
    }).catch( (err) => {
      console.error("Fatal error:", err);
      this.toastr.error("Could not remove key: Internal Server Error");
    });
  }

}

export default ApikeysController;
