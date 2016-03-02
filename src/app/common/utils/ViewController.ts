import {IEventHandlerService} from './EventHandlerService';

export class ViewController {
  private disposes: Function[] = [];
  private enter: Function;
  private beforeEnter: Function;

  constructor($scope, private eventHandler: IEventHandlerService, force: boolean = true) {
    if (force) {
      $scope.$on('$ionicView.afterLeave', (e) => {
        this.dispose();
      });
      $scope.$on('$ionicView.beforeEnter', (e) => {
        if (this.beforeEnter) {
          this.beforeEnter();
        }
      });
      $scope.$on('$ionicView.enter', (e) => {
        if (this.enter) {
          this.enter();
        }
      });
    }
  }

  protected fireEvent(eventKey: string, eventObject: any) {
    this.eventHandler.broadcast(eventKey, eventObject);
  }

  protected addListener(eventKey: string, eventCallback: any) {
    this.disposes.push(this.eventHandler.on(eventKey, eventCallback));
  }

  protected dispose() {
    this.disposes.forEach(disposes => disposes());
  }

  protected onEnter(fn) {
    this.enter = fn;
  }

  protected onBeforeEnter(fn) {
    this.beforeEnter = fn;
  }

}
