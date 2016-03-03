/**
 * Cordova Config
 */

/* tslint:disable:no-string-literal */

export const CordovaConfig = () => {
  document.addEventListener('deviceready', () => {
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
  }, false);
};
