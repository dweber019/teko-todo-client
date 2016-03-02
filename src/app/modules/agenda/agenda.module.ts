import routing from './agenda.routes.ts';
import {injectName as AgendaControllerName, AgendaController} from './agenda.controller.ts';

export var namespace: string = 'app.agenda';

export default angular.module(namespace, [])
  .controller(AgendaControllerName, AgendaController)
  .config(routing)
  .name;
