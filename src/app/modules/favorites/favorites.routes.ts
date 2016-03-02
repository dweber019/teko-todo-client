import {injectName as FavoritesControllerName} from './favorites.controller.ts';

let routing = ($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider
    .state('root.favorites', {
      url: '/favorites',
      template: require('./favorites.view.html'),
      controller: FavoritesControllerName,
      controllerAs: 'vm'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
