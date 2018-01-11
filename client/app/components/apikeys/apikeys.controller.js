class ApikeysController {
  constructor($scope, $ngConfirm) {
    'ngInject';

    this.name = 'apikeys';

    this._$scope = $scope;

    $scope.apiKeys = [
      { name: "key1", key: Math.random().toString(16).substr(2) },
      { name: "key2", key: Math.random().toString(16).substr(2) },
      { name: "key3", key: Math.random().toString(16).substr(2) },
    ];
    $scope.apiTokens = [];

    $scope.addApiKey = function(event, clickPlus ) {
      if ( clickPlus || event.which === 13) {
        $scope.apiKeys.push({
          name: $scope.newKeyName, key: Math.random().toString(16).substr(2)
        })
      }
    };

    $scope.confirm = (key) => {
      console.log({key});
      $ngConfirm({
        title: "Delete API Key?",
        content: "Are you sure you want to remove API Key " + keyname + "?",
        autoClose: 'cancel|10000',
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

}

export default ApikeysController;
