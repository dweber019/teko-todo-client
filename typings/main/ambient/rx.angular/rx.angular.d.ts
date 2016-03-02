// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/Reactive-Extensions/rx.angular.js/master/ts/rx.angular.d.ts
/**
 * Created by Giles Roadnight on 26/01/2016.
 */

declare module Rx {

  export interface Observable<T> {
    safeApply( scope: ng.IScope, onNext?: (value: T) => void, onError?: (error: any) => void, onComplete?: () => void ): Observable<T>;

    digest( scope: ng.IScope, prop: string ): Observable<T>;
  }

  export interface ScopeScheduler extends IScheduler {
    constructor(scope: ng.IScope) : ScopeScheduler;
  }

  export interface ScopeSchedulerStatic extends SchedulerStatic {
    new ($scope: angular.IScope): ScopeScheduler;
  }

  export var ScopeScheduler: ScopeSchedulerStatic;
}

declare module angular{

  export interface IObservableChange<T>{
    observable: Rx.Observable<T>;
    expression: string;
    value: T;
  }

  export interface IScope{
    $createObservableFunction<T>( functionName: string, listener: (data) => void ): Rx.Observable<T>;
    $digestObservables<T>( observables: {[key:string]:Rx.Observable<T>} ): Rx.Observable<IObservableChange<T>>;
    $eventToObservable<T>(eventName: string): Rx.Observable<T>;
    $toObservable<T>(watchExpression: ((scope: ng.IScope) => any|string) | string, objectEquality?:boolean ): Rx.Observable<T>;
  }
}