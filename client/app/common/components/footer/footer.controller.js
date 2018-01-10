class FooterController {
  constructor($scope, $translate) {
    'ngInject';
    this._$scope = $scope;
    this._$translate = $translate;
    this.name = 'footer';


    let availableTranslations = [
      {name: "English", code: "en", flag: "us"},
      {name: "中", code: "zh", flag: "cn"},
      {name: "Русский", code: "ru", flag: "ru"},
      {name: "Український", code: "uk", flag: "ua"}
    ];

    $scope.availableTranslations = availableTranslations;

    this.getLanguageByCode = (langCode) => availableTranslations.filter ( (lang) => lang.code === langCode).shift();


    $scope.current = this.getLanguageByCode($translate.use());
    if (! $scope.current) {
      $scope.current = $scope.availableTranslations[0];
    }

  }


  $onInit() {
    console.log("initializing FooterController...");
  }

  $onDestroy() {
    console.log("destroying FooterController...");
  }

  setLanguage(key) {
    console.log("Using lang", key);
    this._$scope.current = this.getLanguageByCode(key);
    this._$translate.use(key);

  }



  isLanguage(key) {
    return key===this._$translate.use();
  }
}

export default FooterController;
