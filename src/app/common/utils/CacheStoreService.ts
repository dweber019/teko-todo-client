export interface ICacheStoreUtilService {
  has(id: string): boolean;
  get(id: string): any;
  set(id: string, data: any): void;
  clear(id: string): void;
}

export class CacheStoreUtilService implements ICacheStoreUtilService {
  public static $inject = [
    'localStorageService'
  ];

  constructor(private localStorageService: angular.local.storage.ILocalStorageService) {
  }

  public has(id: string): boolean {
    return this.get(id) !== undefined;
  }

  public get(id: string): any {
    return this.localStorageService.get(id);
  }

  public set(id: string, data: any): void {
    this.localStorageService.set(id, data);
  }

  public clear(id: string): void {
    this.localStorageService.remove(id);
  }

}

export var namespace: string = 'app.common.utils';
export var injectName: string = `${namespace}.CacheStoreUtilService`;
