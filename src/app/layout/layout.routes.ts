import {injectName as LayoutControllerName} from './layout.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root', {
      abstract: true,
      template: require('./layout.view.html'),
      controller: LayoutControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
