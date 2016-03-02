import {injectName as TasksControllerName} from './tasks.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.tasks', {
      url: '/tasks',
      template: require('./tasks.view.html'),
      controller: TasksControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
