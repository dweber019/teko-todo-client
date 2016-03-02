export interface IEventHandlerService {
  /**
   * Returns all registered event callbacks.
   */
  list(): { [event: string]: IEventCallback<any>[] };

  /**
   * Register a callback for the given events. Returns
   * a disposal function that unregisters the callback
   * when called.
   */
  on<T>(event: string, callback: IEventCallback<T>): () => boolean;

  /**
   * Invoke all callbacks registered for the given event with
   * the given data. Returns the number of callbacks invoked.
   */
  broadcast<T>(event: string, eventObject?: T): number;
}

export interface IEventCallback<T> {
  (eventObj?: T): void;
}

export class EventHandlerService implements IEventHandlerService {
  private eventCallbacks: { [event: string]: IEventCallback<any>[] };

  constructor() {
    this.eventCallbacks = {};
  }

  public list(): { [event: string]: IEventCallback<any>[] } {
    return this.eventCallbacks;
  }

  public broadcast<T>(event: string, eventObject?: T): number {
    let callbacks = this.eventCallbacks[event] || [];
    callbacks.forEach(cb => cb(eventObject));
    return callbacks.length;
  }

  public on<T>(event: string, callback: IEventCallback<T>): () => boolean {
    let callbacks = this.eventCallbacks[event] || (this.eventCallbacks[event] = []);
    let idx = callbacks.push(callback);

    // destroy function
    return () => {
      if (idx >= 0) {
        callbacks.splice(idx, 1);
      }

      if (callbacks.length === 0) {
        delete this.eventCallbacks[event];
      }

      return idx >= 0;
    };
  }

}

export var namespace: string = 'app.common.utils';
export var injectName: string = `${namespace}.EventHandlerService`;
