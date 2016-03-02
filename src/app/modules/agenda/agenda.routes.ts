import {injectName as AgendaControllerName} from './agenda.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.agenda', {
      url: '/agenda',
      template: require('./agenda.view.html'),
      controller: AgendaControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
