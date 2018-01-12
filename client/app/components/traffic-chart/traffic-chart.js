import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import trafficChartComponent from './traffic-chart.component';

let trafficChartModule = angular.module('traffic-chart', [
  uiRouter
])

.component('traffic-chart', trafficChartComponent)
  .directive('trafficChart', () => ({
    restrict: 'E',
    controller: trafficChartComponent.controller,
    template: trafficChartComponent.template
  }))

.name;

export default trafficChartModule;
