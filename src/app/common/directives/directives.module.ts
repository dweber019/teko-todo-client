import {
  injectName as TaskActionSheetDirectiveControllerName,
  TaskActionSheetDirectiveController,
  TaskActionSheetDirective
} from './taskActionSheet.directive.ts';
import {injectName as TaskActionSheetControllerName, TaskActionSheetController} from './taskActionSheet.controller.ts';

export var namespace: string = 'app.common.directives';

export default angular.module(namespace, [])
  .directive('tekoTaskActionSheet', () => new TaskActionSheetDirective())
  .controller(TaskActionSheetDirectiveControllerName, TaskActionSheetDirectiveController)
  .controller(TaskActionSheetControllerName, TaskActionSheetController)
  .name;
