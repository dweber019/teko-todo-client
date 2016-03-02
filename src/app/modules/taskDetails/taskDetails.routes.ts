import {injectName as TaskDetailsControllerName} from './taskDetails.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.taskDetail', {
      url: '/tasks/{id}',
      template: require('./taskDetails.view.html'),
      controller: TaskDetailsControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
