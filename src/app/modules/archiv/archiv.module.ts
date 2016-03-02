import routing from './archiv.routes.ts';
import {injectName as ArchivControllerName, ArchivController} from './archiv.controller.ts';

export var namespace: string = 'app.archiv';

export default angular.module(namespace, [])
  .controller(ArchivControllerName, ArchivController)
  .config(routing)
  .name;
