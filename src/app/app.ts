/**
 * Import Styles
 */
import '../assets/scss/main.scss';
/**
 * Import Third Libraries
 */
import 'angular';
import 'angular-ui-router';
import 'ionic-sdk/release/js/ionic.bundle.js';
import 'ng-cordova';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-local-storage';
import 'angular-material';
import 'angular-jwt';
import 'angular-toarrayfilter';
import 'angular-messages';

/**
 * Define your app
 */
angular
  .module('app', [
    // AngularJS Libs

    // Third-Party Libs
    'ui.router',
    'ionic',
    'ngCordova',
    'pascalprecht.translate',
    'LocalStorageModule',
    'ngMaterial',
    'angular-jwt',
    'angular-toArrayFilter',
    'ngMessages',

    // Configs, middleware, run...
    require('./core/config/config.ts').namespace,

    // Layout
    require('./layout/layout.module.ts').namespace,

    // Common components, services, filters, models...
    require('./common/directives/directives.module.ts').namespace,
    require('./common/services/services.module.ts').namespace,
    require('./common/utils/utils.module.ts').namespace,

    // App modules
    require('./modules/settings/settings.module.ts').namespace,
    require('./modules/tasks/tasks.module.ts').namespace,
    require('./modules/categories/categories.module.ts').namespace,
    require('./modules/agenda/agenda.module.ts').namespace,
    require('./modules/favorites/favorites.module.ts').namespace,
    require('./modules/archiv/archiv.module.ts').namespace,
    require('./modules/taskDetails/taskDetails.module.ts').namespace,
    require('./modules/taskNew/taskNew.module.ts').namespace
  ]);
