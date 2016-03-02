import AppConfig from './../../core/config/app.config.ts';
import * as EventHandler from './EventHandlerService.ts';

/**
 * @name IHttpUtilService
 * @description
 * This wrapper service build http request with the
 * needed information like headers.
 */
export interface IHttpUtilService {
  /**
   * Create request to create a new object at the database
   */
  create(url: string, data: any, params?: any, skipAuthorization?: boolean): ng.IPromise<any>;
  /**
   * Reads items from the backend
   */
  read(url: string, params?: any, skipAuthorization?: boolean): ng.IPromise<any>;
  /**
   * Updated the given item at the backends database
   */
  update(url: string, data: any, params?: any, skipAuthorization?: boolean): ng.IPromise<any>;
  /**
   * Deletes the given item at the backends database
   */
  destroy(url: string, params?: any, skipAuthorization?: boolean): ng.IPromise<any>;
  /**
   * This is a helper method for custom requests
   */
  custom(method: string, url: string, params?: any, data?: any, headers?: any, skipAuthorization?: boolean)
    : ng.IPromise<any>;
  /**
   * Returns the backend url from the app config
   */
  getBackendUrl(): string;
}

/**
 * @name IHttpUtilService
 * @requires $http
 */
export class HttpUtilService {
  public static NO_CONNECTION: string = 'HttpUtilService.NoConnection';

  public static $inject = [
    '$q',
    '$http',
    EventHandler.injectName
  ];
  constructor(
    private $q: ng.IQService,
    private $http: angular.IHttpService,
    private eventHandlerService: EventHandler.IEventHandlerService
  ) {
  }

  //region Public API
  //===========================================================================================
  public create(url: string, data: any, params?: any, skipAuthorization: boolean = false): ng.IPromise<any> {
    return this.request('POST', AppConfig.API_URL + url, skipAuthorization, params, data);
  }

  public read(url: string, params?: any, skipAuthorization: boolean = false): ng.IPromise<any> {
    return this.request('GET', AppConfig.API_URL + url, skipAuthorization, params);
  }

  public update(url: string, data: any, params?: any, skipAuthorization: boolean = false): ng.IPromise<any> {
    return this.request('PUT', AppConfig.API_URL + url, skipAuthorization, params, data);
  }

  public destroy(url: string, params?: any, skipAuthorization: boolean = false): ng.IPromise<any> {
    return this.request('DELETE', AppConfig.API_URL + url, skipAuthorization, params);
  }

  public custom(
    method: string,
    url: string,
    params?: any,
    data?: any,
    headers?: any,
    skipAuthorization: boolean = false
  ): ng.IPromise<any> {
    return this.request(method, AppConfig.API_URL + url, skipAuthorization, params, data, headers);
  }

  public getBackendUrl(): string {
    return AppConfig.API_URL;
  }

  //endregion
  //region Private API
  //===========================================================================================

  private request(method: string, url: string, skipAuthorization: boolean, params?: any, data?: any, headers?: any): ng.IPromise<any> {
    let body = {
      method: method || 'GET',
      url: url,
      skipAuthorization: skipAuthorization,
      headers: undefined,
      data: undefined,
      params: undefined
    };
    body.headers = {
      'Accept': `application/json`,
      'Content-Type': `application/json`
    };
    if (headers) {
      angular.extend(body.headers, headers);
    }
    if (data) {
      body.data = data;
    }
    if (params) {
      body.params = params;
    }
    let def = this.$q.defer();

    this.$http(body)
        .then(response => {
          def.resolve(response.data);
        }, response => {
          if (response.status === 0) {
            this.eventHandlerService.broadcast(HttpUtilService.NO_CONNECTION);
          }

          def.reject(response);
        });

    return def.promise;
  }

  //endregion
}

export var namespace: string = 'app.common.utils';
export var injectName: string = `${namespace}.HttpUtilService`;
