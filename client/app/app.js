import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// import './uikit/main.scss';



import angular from 'angular';
import toastr from 'angular-toastr';
import 'angular-toastr/dist/angular-toastr.css';
import 'angular-messages';
import 'angular-animate';
import 'angular-touch';
import 'angular-cookies';
import 'angular-translate';
import 'angular-translate-storage-cookie';
import 'angular-translate-storage-local';
import 'angular-translate-handler-log';
import 'angular-ui-bootstrap';
import 'ngclipboard';
import 'angular-translate-interpolation-messageformat';
import 'angular-google-analytics';
import 'angular-loading-bar/build/loading-bar.css';
import 'angular-loading-bar';

import 'angular-sanitize';
import 'satellizer';
import 'angular-confirm1';
import 'angular-confirm1/css/angular-confirm.css';

import 'amcharts/dist/amcharts/amcharts';
import 'amcharts/dist/amcharts/plugins/responsive/responsive.min.js';

import 'amcharts/dist/amcharts/themes/dark';
import 'ammaps/dist/ammap/ammap.js';
import 'ammaps/dist/ammap/ammap.css'
import 'ammaps/dist/ammap/maps/js/worldLow.js';

import uiRouter from '@uirouter/angularjs';

import 'chart.js'


import 'bootstrap-switch';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';


import Common from './common/';
import Components from './components/';
import AppComponent from './app.component';
import AppRun from './app.run';
import AppConstants from './app.constants';
import AppConfig from './app.config';


const requires = [
  'ngCookies',
  'ngTouch',
  'ngMessages',
  'ngAnimate',
  toastr,
  uiRouter,
  'pascalprecht.translate',
  'angular-loading-bar',
  'angular-google-analytics',
  'satellizer',
  'ngclipboard',
  'ui.bootstrap',
  'cp.ngConfirm',
  Common,
  Components
];

angular.module('app', requires)
  .component('app', AppComponent)
  .constant('AppConstants', AppConstants)
  .config(AppConfig)
  .run(AppRun);
