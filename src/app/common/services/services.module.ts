import {injectName as TitleServiceName, TitleService} from './TitelService.ts';
import {injectName as ToolbarSearchServiceName, ToolbarSearchService} from './ToolbarSearchService.ts';

export var namespace: string = 'app.common.services';

export default angular.module(namespace, [])
  .service(TitleServiceName, TitleService)
  .service(ToolbarSearchServiceName, ToolbarSearchService)
  .name;
