import routing from './settings.routes.ts';
import {injectName as SettingsControllerName, SettingsController} from './settings.controller.ts';

export var namespace: string = 'app.settings';

export default angular.module(namespace, [])
  .controller(SettingsControllerName, SettingsController)
  .config(routing)
  .name;
