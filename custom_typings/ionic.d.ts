declare module Ionic {

  /**
   * @name IIonicScrollDelegateInstance
   * @description
   * Scroll Handler
   */
  interface IIonicScrollDelegateInstance {
    resize();
    getScrollPosition(): IIonicScrollPosition;
    scrollTop(shouldAnimate?: boolean);
    scrollBottom(shouldAnimate?: boolean);
    scrollTo(left: number, top: number, shouldAnimate?: boolean);
    scrollBy(left: number, top: number, shouldAnimate?: boolean);
  }

  interface IIonicScrollPosition {
    left: number;
    top: number;
  }

  /**
   * @name IIonicScrollDelegate
   * @description
   * Scroll Handler
   */
  interface IIonicScrollDelegate extends IIonicScrollDelegateInstance {
    /**
     * Returns:
     * delegateInstance A delegate instance that controls only the
     * scrollViews with delegate-handle matching the given handle.
     */
    $getByHandle(handle: string): IIonicScrollDelegateInstance;
  }
  /**
   * @name IIonicModalService
   * @description
   * Modal Servcie
   */
  interface IIonicModalService {
    fromTemplateUrl(templateUrl: string, options: IIonicModalOptions): Promise<IIonicModalInstance>;
    fromTemplate(templatestring: string, options: IIonicModalOptions): Promise<IIonicModalInstance>;
  }
  /**
   * @name IIonicKeyboardService
   * @description
   * Accessing the Keyboard of iOS from cordova
   */
  interface IIonicKeyboardService {
    hideAccessoryBar(action: boolean);
    disableScroll(action: boolean);
    close();
    isVisible(): boolean;
  }
  /**
   * @name IIonicModalInstance
   * @description
   * Modal Instance
   */
  interface IIonicModalInstance {
    show(): Promise<any>;
    hide(): Promise<any>;
    remove(): Promise<any>;
  }
  /**
   * @name IIonicModalOptions
   * @description
   * Modal Instance
   */
  interface IIonicModalOptions {
    scope: angular.IScope;
    focusFirstInput?: boolean;
    animation?: string;
    hardwareBackButtonClose?: boolean;
    backdropClickToClose?: boolean;
  }

}
