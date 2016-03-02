import {injectName as TaskNewControllerName} from './taskNew.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.taskNew', {
      url: '/tasks/new/empty',
      template: require('./taskNew.view.html'),
      controller: TaskNewControllerName,
      controllerAs: 'vm'
    })
    .state('root.taskEdit', {
      url: '/tasks/edit/{id}',
      template: require('./taskNew.view.html'),
      controller: TaskNewControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
