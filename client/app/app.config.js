import en from './i18n/i18n.en.json';
import zh from './i18n/i18n.zh.json';
import uk from './i18n/i18n.uk.json';
import ru from './i18n/i18n.ru.json';



function AppConfig(
  $logProvider,
  toastrConfig,
  $httpProvider,
  $stateProvider,
  $locationProvider,
  $urlRouterProvider,
  $translateProvider,
  AnalyticsProvider,
  AppConstants
) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  $httpProvider.interceptors.push('authInterceptor');


  // Adding a translation table for the English language
  $translateProvider.translations('en', en);
  $translateProvider.translations('zh', zh);
  $translateProvider.translations('uk', uk);
  $translateProvider.translations('ru', ru);

  $translateProvider.fallbackLanguage('en');

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');
  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();

  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useMessageFormatInterpolation();

  /*
    If you don't want hashbang routing, uncomment this line.
    Our tutorial will be using hashbang routing though :)
  */
  $locationProvider.html5Mode(true);
  //$locationProvider.html5Mode(true).hashPrefix('!');
  AnalyticsProvider
    .setAccount(AppConstants.GA_KEY)
    .useECommerce(false)
    .useEnhancedLinkAttribution(true)
    .setPageEvent('$stateChangeSuccess'); // ui router fires that event on page change

  // This method is designed specifically for unit testing and entering test mode cannot be changed after
  // being called. Test mode skips the insertion of the Google Analytics script tags (both classic and universal)
  // and ensures there is a $window.ga() method available for calling by unit tests. This corrects transient
  // errors that were seen during unit tests due to the operation of the Google Analytics scripts.
  // AnalyticsProvider.enterTestMode();
  // AnalyticsProvider.enterDebugMode(true);
  // AnalyticsProvider.logAllCalls(true);


  $stateProvider
    .state('app', {
      abstract: true,
      component: 'app',
      data: {
        requiresAuth: true
          // auth: function (Auth) {
          //   return Auth.ensureAuthIs();
          // }
      }
    });

  $urlRouterProvider.otherwise('/');
}

export default AppConfig;
