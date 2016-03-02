import routing from './tasks.routes.ts';
import {injectName as TasksControllerName, TasksController} from './tasks.controller.ts';

export var namespace: string = 'app.tasks';

export default angular.module(namespace, [])
  .controller(TasksControllerName, TasksController)
  .config(routing)
  .name;
