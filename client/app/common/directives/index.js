import angular from 'angular';
import ShowAuthed from './show-authed.directive';
import validateEquals from "./validate-equals.directive";

let directivesModule = angular.module('app.common.directives', [])
  .directive('showAuthed', ShowAuthed)
  .directive('validateEquals', validateEquals)
  .name;

export default directivesModule;
