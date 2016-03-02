/**
 * @name TitleService
 */
export interface ITitleService {
  setTitle(translationId: string): void;
  getTitle(): string;
}

export class TitleService implements ITitleService {

  private translationId: string;

  public setTitle(translationId: string): void {
    this.translationId = translationId;
  }

  public getTitle(): string {
    return this.translationId;
  }
}

export var namespace: string = 'app.common.services';
export var injectName: string = `${namespace}.TitleService`;
