import {injectName as SettingsControllerName} from './settings.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.settings', {
      url: '/settings',
      template: require('./settings.view.html'),
      controller: SettingsControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
