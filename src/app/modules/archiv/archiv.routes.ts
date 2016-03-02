import {injectName as ArchivControllerName} from './archiv.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.archiv', {
      url: '/archiv',
      template: require('./archiv.view.html'),
      controller: ArchivControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
