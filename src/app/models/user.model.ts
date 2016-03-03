import AbstractModel, {IModelFillAbles, IModelFillAblesTypes, IModelAttributes, IAbstractModel} from './abstract.model.ts';

export interface IUserModelAttributes {
  id: number;
  firstName: string;
  lastName: string;
  birthday: moment.Moment;
  email: string;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}

export interface IUserModel extends IAbstractModel {
  attributes: IUserModelAttributes;
}

class UserModel extends AbstractModel {

  /* tslint:disable:no-unused-variable */
  private static rootUrl = 'users';
  /* tslint:enable:no-unused-variable */

  constructor(attrs?: IModelAttributes) {
    super(UserModel, attrs);
  }

  protected fillAbles(): IModelFillAbles {
    return {
      id: IModelFillAblesTypes.NUMBER,
      firstName: IModelFillAblesTypes.STRING,
      lastName: IModelFillAblesTypes.STRING,
      birthday: IModelFillAblesTypes.DATE,
      email: IModelFillAblesTypes.STRING,
      createdAt: IModelFillAblesTypes.DATE,
      updatedAt: IModelFillAblesTypes.DATE
    };
  };

  // CUSTOM FACADE -----------------------------------------------
  public static getCurrentUser(): ng.IPromise<IUserModel> { return new UserModel()._customRead('/authenticate'); }

  // STATIC FACADE -----------------------------------------------

  /**
   * find Entity
   * @param id
   */
  public static find(id): ng.IPromise<IUserModel> { return new UserModel()._find(id); }

  /**
   * find all Entities
   */
  public static all(): ng.IPromise<IUserModel[]> { return new UserModel()._all(); }

  /**
   * delete a Entity
   * @param id
   */
  public static destory(id): ng.IPromise<void> { return new UserModel()._destory(id); }

  /**
   * create an Entity
   */
  public static create(data: IModelAttributes): ng.IPromise<IUserModel> { return new UserModel(data).save(); }
}

export default UserModel;
