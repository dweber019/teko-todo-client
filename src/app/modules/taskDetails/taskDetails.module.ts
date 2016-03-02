import routing from './taskDetails.routes.ts';
import {injectName as TaskDetailsControllerName, TaskDetailsController} from './taskDetails.controller.ts';

export var namespace: string = 'app.taskDetails';

export default angular.module(namespace, [])
  .controller(TaskDetailsControllerName, TaskDetailsController)
  .config(routing)
  .name;
