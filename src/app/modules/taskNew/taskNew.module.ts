import routing from './taskNew.routes.ts';
import {injectName as TaskNewControllerName, TaskNewController} from './taskNew.controller.ts';

export var namespace: string = 'app.taskNew';

export default angular.module(namespace, [])
  .controller(TaskNewControllerName, TaskNewController)
  .config(routing)
  .name;
