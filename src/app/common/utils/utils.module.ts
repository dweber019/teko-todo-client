import {injectName as CacheStoreUtilServiceName, CacheStoreUtilService} from './CacheStoreService.ts';
import {injectName as EventHandlerServiceName, EventHandlerService} from './EventHandlerService.ts';
import {injectName as HttpUtilServiceName, HttpUtilService} from './HttpService.ts';

export var namespace: string = 'app.common.utils';

export default angular.module(namespace, [])
  .service(CacheStoreUtilServiceName, CacheStoreUtilService)
  .service(EventHandlerServiceName, EventHandlerService)
  .service(HttpUtilServiceName, HttpUtilService)
  .name;
