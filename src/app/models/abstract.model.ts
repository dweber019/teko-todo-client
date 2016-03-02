import moment = require('moment');
import {IHttpUtilService} from './../common/utils/HttpService.ts';

export interface IModelFillAbles {
  [key: string]: IModelFillAblesTypes;
}

export enum IModelFillAblesTypes {
  NUMBER,
  FLOAT,
  STRING,
  BOOL,
  DATE,
  TIME
}

export type IModelIdentifier = string | number;

export type IModelAttributes = any;

export interface IAbstractModel {
  attributes: IModelAttributes;
  isNew(): boolean;
  save<T>(): ng.IPromise<T>;
  destroy<T>(): ng.IPromise<T>;
  resetAttributes(): IModelAttributes;
  toArray(): IModelAttributes;
  bulkUpdateAttrs(list: IModelAttributes): IModelAttributes;
  getId(): IModelIdentifier;
}

abstract class AbstractModel implements IAbstractModel {

  /**
   * Http Service
   */
  public static httpService: IHttpUtilService;

  /**
   * Provide the identifier key
   */
  protected identifier: string = 'id';

  /**
   * Date format
   */
  protected httpDateFormat: string = 'YYYY-MM-DD HH:mm:ss';

  /**
   * Http send identifier
   */
  protected httpSendIdentifier: boolean = false;

  /**
   * Http don't sent this data
   */
  protected httpNotSendData: string[] = [
    'createdAt',
    'updatedAt'
  ];

  /**
   * original
   */
  protected original: IModelAttributes = {};

  /**
   * attributes
   */
  public attributes: IModelAttributes = {};

  /**
   * Constructor
   * @param model
   * @param attrs
   */
  constructor(private model: any, attrs?: IModelAttributes) {
    if (attrs) { this.fill(attrs); } else { this.fillEmpty(); }
  }

  /**
   * Helpers
   */
  public isNew(): boolean { return !this.getId(); }

  /**
   * Manuipulation queries
   */
  public save(): ng.IPromise<IAbstractModel> {
    return this.isNew() ?
      this._create(this.convertToHttpData(this.toArray())) : this._update(this.convertToHttpData(this.toArray()));
  }

  public destroy(): ng.IPromise<void> {
    return this._destory(this.original[this.identifier]);
  }

  /**
   * Attribute handling
   */
  public resetAttributes(): IModelAttributes { return this.attributes = angular.copy(this.original); }
  public toArray(): IModelAttributes { return this.attributes; }
  public bulkUpdateAttrs(list: IModelAttributes): IModelAttributes {
    return Object.keys(list).map(key => this.attributes[key] = list[key]);
  }
  public getId(): IModelIdentifier { return <IModelIdentifier>this.attributes[this.identifier]; }

  /**
   * Search queries
   */
  protected _find(id: IModelIdentifier): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}/${id}`).then(r => this.newModel(r));
  }

  protected _all(): ng.IPromise<IAbstractModel[]> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}`).then(r => this.newModel(r));
  }

  protected _findRelation(localId: IModelIdentifier, relation: string, foreignId: IModelIdentifier): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}/${localId}/${relation}/${foreignId}`).then(r => this.newModel(r));
  }

  protected _allRelation(localId: string, relation: string): ng.IPromise<IAbstractModel[]> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}/${localId}/${relation}`).then(r => this.newModel(r));
  }

  protected _customRead(url: string): ng.IPromise<IAbstractModel | IAbstractModel[]> {
    return AbstractModel.httpService.read(url).then(r => this.newModel(r));
  }

  protected _destory(id: IModelIdentifier): ng.IPromise<void> {
    return AbstractModel.httpService.destroy(`/${this.model.rootUrl}/${id}`).then(r => void 0);
  }

  protected _update(data: IModelAttributes): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.update(`/${this.model.rootUrl}/${this.getId()}`, data).then(r => this.newModel(r));
  }

  protected _create(data: IModelAttributes): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.create(`/${this.model.rootUrl}`, data).then(r => this.newModel(r));
  }

  /**
   * Convert model to http data
   */
  protected convertToHttpData(attrs: IModelAttributes): IModelAttributes {
    let tempHttpData = {};
    Object.keys(this.fillAbles())
      .forEach(key => {
        if (angular.isDefined(attrs[key])) {
          tempHttpData[key] = this.convertToHttpType(attrs[key], this.fillAbles()[key]);
        }
      });
    if (!this.httpSendIdentifier) {
      delete tempHttpData[this.identifier];
    }
    this.httpNotSendData.forEach(i => delete tempHttpData[i]);
    return tempHttpData;
  };

  /**
   * New model helper
   */
  protected newModel(data: any): IAbstractModel | IAbstractModel[] {
    return data && Array.isArray(data) && data.map(e => new this.model(e)) ||
    data && Object.keys(data).length > 0 && new this.model(data) ||
    data && Array.isArray(data) && [] ||
    data && {} ||
    undefined;
  }

  /**
   * A list off all accessible model attributes with the data type
   */
  protected abstract fillAbles(): IModelFillAbles;

  /**
   * Fill the specific model attributes with the paramter
   */
  protected fill(attrs: IModelAttributes): IModelAttributes {
    return attrs && Object.keys(this.fillAbles())
      .map(key => angular.isDefined(attrs[key]) && (this.original[key] = this.convertToType(attrs[key], this.fillAbles()[key]))) &&
      this.resetAttributes();
  }

  /**
   * Empty element
   */
  protected fillEmpty(): IModelAttributes {
    return Object.keys(this.fillAbles()).map(key => this.attributes[key] = undefined);
  }

  /**
   * Convert to type
   */
  private convertToType<T>(value: any, type: IModelFillAblesTypes): T {
    let returnValue;
    switch (type) {
      case IModelFillAblesTypes.NUMBER:
        returnValue = parseInt(value);
        break;
      case IModelFillAblesTypes.FLOAT:
        returnValue = parseFloat(value);
        break;
      case IModelFillAblesTypes.STRING:
        returnValue = value.toString();
        break;
      case IModelFillAblesTypes.BOOL:
        returnValue = !!value;
        break;
      case IModelFillAblesTypes.DATE:
        returnValue = moment(value);
        break;
      default:
        returnValue = value;
    }
    return returnValue;
  };

  /**
   * Convert to http type
   */
  private convertToHttpType<T>(value: any, type: IModelFillAblesTypes): T {
    let returnValue;
    switch (type) {
      case IModelFillAblesTypes.NUMBER:
        returnValue = parseInt(value);
        break;
      case IModelFillAblesTypes.FLOAT:
        returnValue = parseFloat(value);
        break;
      case IModelFillAblesTypes.STRING:
        returnValue = value.toString();
        break;
      case IModelFillAblesTypes.BOOL:
        returnValue = !!value;
        break;
      case IModelFillAblesTypes.DATE:
        returnValue = moment(value).format(this.httpDateFormat);
        break;
      default:
        returnValue = value;
    }
    return returnValue;
  };

}

export default AbstractModel;
