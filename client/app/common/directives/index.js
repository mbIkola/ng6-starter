import angular from 'angular';
import ShowAuthed from './show-authed.directive';
import validateEquals from "./validate-equals.directive";
import switchDirective from "./switch.directive";

let directivesModule = angular.module('app.common.directives', [])
  .directive('showAuthed', ShowAuthed)
  .directive('validateEquals', validateEquals)
  .directive('switch', switchDirective)
  .name;

export default directivesModule;
