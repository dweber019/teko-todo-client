/**
 * Angular Router Config
 */
export var RouterConfig = ($urlRouterProvider) => {
  console.info('RouterConfig');
  $urlRouterProvider.otherwise('/agenda');
};

RouterConfig.$inject = ['$urlRouterProvider'];
