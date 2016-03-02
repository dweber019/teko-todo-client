/**
 * Ionic Config
 */

/* tslint:disable:no-string-literal */

export const IonicConfig = ($ionicConfigProvider) => {
  $ionicConfigProvider.views['maxCache'](0);
  $ionicConfigProvider.views['swipeBackEnabled'](false);
  $ionicConfigProvider['scrolling']['jsScrolling'](false);
};

export const IonicPlatform = ($ionicPlatform) => {
  $ionicPlatform.ready(() => {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window['StatusBar']) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
  });
};
