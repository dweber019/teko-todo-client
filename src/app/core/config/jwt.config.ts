/**
 * Angular Jwt Config
 */
export let namespace: string = 'app.config.jwt';

import Logger from './../../common/utils/Logger.service.ts';
import {injectName as HttpServiceInject, IHttpUtilService} from './../../common/utils/HttpService.ts';

export interface ITokenResponseData {
  token: string;
}

export var JwtTokenGetter = (config,
                             jwtHelper,
                             httpService: IHttpUtilService,
                             $state: ng.ui.IStateService,
                             localStorageService: angular.local.storage.ILocalStorageService) => {
  let logger = new Logger(namespace);
  logger.debug('START: request intercepted');
  if (
    config.url.substr(config.url.length - 5) === '.html' ||
    config.url.substr(config.url.length - 5) === '.json' ||
    (config.url.substr(config.url.length - 12) === 'authenticate' && config.method !== 'GET')
  ) {
    logger.debug('INPRO: no jwt', config.url);
    return undefined;
  }

  let token = localStorageService.get('token');
  if (!token) {
    logger.debug('INPRO: token not existing');
    $state.go('root.settings');
    return undefined;
  }

  if (jwtHelper.isTokenExpired(token)) {
    logger.debug('INPRO: token expired');
    return httpService.custom('PUT', '/authenticate', undefined, undefined, { Authorization: 'Bearer ' + token })
      .then((data: ITokenResponseData) => {
        logger.debug('END: refresh token success');
        let newToken: string = data.token;
        localStorageService.set('token', newToken);
        return newToken;
      }).catch(() => {
        logger.debug('END: refresh token fail');
        localStorageService.remove('token');
        $state.go('root.settings');
        return undefined;
      });
  } else {
    logger.debug('END: token valid');
    return token;
  }
};
JwtTokenGetter.$inject = ['config', 'jwtHelper', HttpServiceInject, '$state', 'localStorageService'];

export var JwtConfig = ($httpProvider: ng.IHttpProvider, jwtInterceptorProvider) => {
  // Please note we're annotating the function so that the $injector works when the file is minified
  jwtInterceptorProvider.tokenGetter = JwtTokenGetter;

  $httpProvider.interceptors.push('jwtInterceptor');
};
JwtConfig.$inject = ['$httpProvider', 'jwtInterceptorProvider'];
