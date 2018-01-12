import Traffic-chartModule from './traffic-chart'
import Traffic-chartController from './traffic-chart.controller';
import Traffic-chartComponent from './traffic-chart.component';
import Traffic-chartTemplate from './traffic-chart.html';

describe('Traffic-chart', () => {
  let $rootScope, makeController;

  beforeEach(window.module(Traffic-chartModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new Traffic-chartController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(Traffic-chartTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = Traffic-chartComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(Traffic-chartTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(Traffic-chartController);
      });
  });
});
