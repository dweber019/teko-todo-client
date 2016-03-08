import moment = require('moment');
import {IHttpUtilService} from './../common/utils/HttpService.ts';

/**
 * The attributes interface
 *
 * @export
 * @interface IModelFillAbles
 */
export interface IModelFillAbles {
  [key: string]: IModelFillAblesTypes;
}

/**
 * The available types
 *
 * @export
 * @enum {number}
 */
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

/**
 * The Abstract model interface
 *
 * @export
 * @interface IAbstractModel
 */
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

/**
 * The Abstract model
 *
 * @abstract
 * @class AbstractModel
 * @implements {IAbstractModel}
 */
abstract class AbstractModel implements IAbstractModel {

  /**
   * HttpService
   *
   * @static
   * @type {IHttpUtilService}
   */
  public static httpService: IHttpUtilService;

  /**
   * Identifier
   * This can be overwriten by a direved class if needed
   *
   * @protected
   * @type {string}
   */
  protected identifier: string = 'id';

  /**
   * Default time format which is used in your backend
   *
   * @protected
   * @type {string}
   */
  protected httpDateFormat: string = 'YYYY-MM-DD HH:mm:ss';

  /**
   * Should we send the identifier within the payload
   *
   * @protected
   * @type {boolean}
   */
  protected httpSendIdentifier: boolean = false;

  /**
   * Which data should we not send to the backend
   *
   * @protected
   * @type {string[]}
   */
  protected httpNotSendData: string[] = [
    'createdAt',
    'updatedAt'
  ];

  /**
   * This holds you attributes from the backend
   *
   * @protected
   * @type {IModelAttributes}
   */
  protected original: IModelAttributes = {};

  /**
   * This hold the attributes you are action on
   *
   * @type {IModelAttributes}
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
   * Tells if the model is new
   *
   * @returns {boolean}
   */
  public isNew(): boolean { return !this.getId(); }

  /**
   * Saves the actin model
   *
   * @returns {ng.IPromise<IAbstractModel>}
   */
  public save(): ng.IPromise<IAbstractModel> {
    return this.isNew() ?
      this._create(this.convertToHttpData(this.toArray())) : this._update(this.convertToHttpData(this.toArray()));
  }

  /**
   * Destories the actin model
   *
   * @returns {ng.IPromise<void>}
   */
  public destroy(): ng.IPromise<void> {
    return this._destory(this.original[this.identifier]);
  }

  /**
   * Resets the attribtes from the original
   *
   * @returns {IModelAttributes}
   */
  public resetAttributes(): IModelAttributes { return this.attributes = angular.copy(this.original); }

  /**
   * Convert the actin model to an array
   *
   * @returns {IModelAttributes}
   */
  public toArray(): IModelAttributes { return this.attributes; }

  /**
   * You can update multipe attributes at once
   *
   * @param {IModelAttributes} list
   * @returns {IModelAttributes}
   */
  public bulkUpdateAttrs(list: IModelAttributes): IModelAttributes {
    return Object.keys(list).map(key => this.attributes[key] = list[key]);
  }

  /**
   * Get the identifier attribute value
   *
   * @returns {IModelIdentifier}
   */
  public getId(): IModelIdentifier { return <IModelIdentifier>this.attributes[this.identifier]; }

  /**
   * Find a specific model
   *
   * @protected
   * @param {IModelIdentifier} id
   * @returns {ng.IPromise<IAbstractModel>}
   */
  protected _find(id: IModelIdentifier): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}/${id}`).then(r => this.newModel(r));
  }

  /**
   * Find all models
   *
   * @protected
   * @returns {ng.IPromise<IAbstractModel[]>}
   */
  protected _all(): ng.IPromise<IAbstractModel[]> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}`).then(r => this.newModel(r));
  }

  /**
   * Find a specific related model from the actin model
   *
   * @protected
   * @param {IModelIdentifier} localId
   * @param {string} relation
   * @param {IModelIdentifier} foreignId
   * @returns {ng.IPromise<IAbstractModel>}
   */
  protected _findRelation(localId: IModelIdentifier, relation: string, foreignId: IModelIdentifier): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}/${localId}/${relation}/${foreignId}`).then(r => this.newModel(r));
  }

  /**
   * Find all related models form the actin model
   *
   * @protected
   * @param {string} localId
   * @param {string} relation
   * @returns {ng.IPromise<IAbstractModel[]>}
   */
  protected _allRelation(localId: string, relation: string): ng.IPromise<IAbstractModel[]> {
    return AbstractModel.httpService.read(`/${this.model.rootUrl}/${localId}/${relation}`).then(r => this.newModel(r));
  }

  /**
   * Here is a mighty custom reader
   *
   * @protected
   * @param {string} url
   * @returns {(ng.IPromise<IAbstractModel | IAbstractModel[]>)}
   */
  protected _customRead(url: string): ng.IPromise<IAbstractModel | IAbstractModel[]> {
    return AbstractModel.httpService.read(url).then(r => this.newModel(r));
  }

  /**
   * Destories a model
   *
   * @protected
   * @param {IModelIdentifier} id
   * @returns {ng.IPromise<void>}
   */
  protected _destory(id: IModelIdentifier): ng.IPromise<void> {
    return AbstractModel.httpService.destroy(`/${this.model.rootUrl}/${id}`).then(r => void 0);
  }

  /**
   * Update a model
   *
   * @protected
   * @param {IModelAttributes} data
   * @returns {ng.IPromise<IAbstractModel>}
   */
  protected _update(data: IModelAttributes): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.update(`/${this.model.rootUrl}/${this.getId()}`, data).then(r => this.newModel(r));
  }

  /**
   * Create a model
   *
   * @protected
   * @param {IModelAttributes} data
   * @returns {ng.IPromise<IAbstractModel>}
   */
  protected _create(data: IModelAttributes): ng.IPromise<IAbstractModel> {
    return AbstractModel.httpService.create(`/${this.model.rootUrl}`, data).then(r => this.newModel(r));
  }

  /**
   * Converts attributes to HTTP data
   *
   * @private
   * @param {IModelAttributes} attrs
   * @returns {IModelAttributes}
   */
  private convertToHttpData(attrs: IModelAttributes): IModelAttributes {
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
   * This will create a new model(s) no matter what happens
   *
   * @private
   * @param {*} data
   * @returns {(IAbstractModel | IAbstractModel[])}
   */
  private newModel(data: any): IAbstractModel | IAbstractModel[] {
    return data && Array.isArray(data) && data.map(e => new this.model(e)) ||
    data && Object.keys(data).length > 0 && new this.model(data) ||
    data && Array.isArray(data) && [] ||
    data && {} ||
    undefined;
  }

  /**
   * You have to define fillAbles, these are your attributes
   *
   * @protected
   * @abstract
   * @returns {IModelFillAbles}
   */
  protected abstract fillAbles(): IModelFillAbles;

  /**
   * Fill up your model with attributes
   *
   * @private
   * @param {IModelAttributes} attrs
   * @returns {IModelAttributes}
   */
  private fill(attrs: IModelAttributes): IModelAttributes {
    return attrs && Object.keys(this.fillAbles())
      .map(key => angular.isDefined(attrs[key]) && (this.original[key] = this.convertToType(attrs[key], this.fillAbles()[key]))) &&
      this.resetAttributes();
  }

  /**
   * Create an empty model
   *
   * @private
   * @returns {IModelAttributes}
   */
  private fillEmpty(): IModelAttributes {
    return Object.keys(this.fillAbles()).map(key => this.attributes[key] = undefined);
  }

  /**
   * Convert values to specific types
   *
   * @private
   * @template T
   * @param {*} value
   * @param {IModelFillAblesTypes} type
   * @returns {T}
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
   * Convert HTTP data to specific attributes
   *
   * @private
   * @template T
   * @param {*} value (description)
   * @param {IModelFillAblesTypes} type (description)
   * @returns {T} (description)
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
