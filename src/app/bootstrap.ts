import './app.ts';

class CordovaInit {

  constructor() {
    console.log('INIT - Bootstrapping!');
    //If cordova is present, wait for it to initialize, otherwise just try to
    //bootstrap the application.
    if (window.cordova !== undefined) {
      console.log('INIT - Cordova found, wating for device.');
      this.bindEvents();
    } else {
      console.log('INIT - Cordova not found, booting application');
      this.receivedEvent('manual');
    }
  }

  public onDeviceReady = () => {
    console.log('INIT - onDeviceReady');
    this.receivedEvent('deviceready');
  };

  public receivedEvent = (event) => {
    console.log('INIT - Start event received, bootstrapping application setup.');
    angular.bootstrap(document.getElementsByTagName('body')[0], ['app']);
  };

  public bindEvents = () => {
    console.log('INIT - bindEvents');
    document.addEventListener('deviceready', this.onDeviceReady, false);
  };
};

/* tslint:disable */
new CordovaInit();
