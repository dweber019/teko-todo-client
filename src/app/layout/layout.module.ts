import routing from './layout.routes.ts';
import {injectName as LayoutControllerName, LayoutController} from './layout.controller.ts';

export var namespace: string = 'app.layout';

export default angular.module(namespace, [])
  .controller(LayoutControllerName, LayoutController)
  .config(routing)
  .name;
