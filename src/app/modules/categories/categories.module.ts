import routing from './categories.routes.ts';
import {injectName as CategoriesControllerName, CategoriesController} from './categories.controller.ts';

export var namespace: string = 'app.categories';

export default angular.module(namespace, [])
  .controller(CategoriesControllerName, CategoriesController)
  .config(routing)
  .name;
