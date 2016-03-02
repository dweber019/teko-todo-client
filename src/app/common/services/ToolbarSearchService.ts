/**
 * @name ToolbarSearchService
 */
export interface IToolbarSearchService {
  setSearch(value: string): void;
  getSearch(): string;
}

export class ToolbarSearchService implements IToolbarSearchService {

  private value: string;

  public setSearch(value: string): void {
    this.value = value;
  }

  public getSearch(): string {
    return this.value;
  }
}

export var namespace: string = 'app.common.services';
export var injectName: string = `${namespace}.ToolbarSearchService`;
