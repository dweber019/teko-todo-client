import routing from './favorites.routes.ts';
import {injectName as FavoritesControllerName, FavoritesController} from './favorites.controller.ts';

export var namespace: string = 'app.favorites';

export default angular.module(namespace, [])
  .controller(FavoritesControllerName, FavoritesController)
  .config(routing)
  .name;
