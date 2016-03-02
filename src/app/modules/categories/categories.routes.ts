import {injectName as CategoriesControllerName} from './categories.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.categories', {
      url: '/categories',
      template: require('./categories.view.html'),
      controller: CategoriesControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
