import template from './footer.html';
import controller from './footer.controller';
import './footer.scss';

import 'flag-icon-css/sass/flag-icon.scss';

let footerComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default footerComponent;
