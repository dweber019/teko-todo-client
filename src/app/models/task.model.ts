import AbstractModel, {IModelFillAbles, IModelFillAblesTypes, IModelAttributes, IAbstractModel} from './abstract.model.ts';

export enum ITaskModelStatus {
  OPEN = <any>'open',
  IN_PROCESS = <any>'inprocess',
  CLOSED = <any>'closed',
  ARCHIVED = <any>'archived'
};

export interface ITaskModelAttributes {
  id: number;
  name: string;
  discription: string;
  dueDate: moment.Moment;
  favorite: boolean;
  status: ITaskModelStatus;
  tasklistId: number;
  userId: number;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}

export interface ITaskModel extends IAbstractModel {
  attributes: ITaskModelAttributes;
}

class TaskModel extends AbstractModel implements ITaskModel {

  /* tslint:disable:no-unused-variable */
  private static rootUrl = 'tasks';
  /* tslint:enable:no-unused-variable */

  constructor(attrs?: IModelAttributes) {
    super(TaskModel, attrs);
  }

  protected fillAbles(): IModelFillAbles {
    return {
      id: IModelFillAblesTypes.NUMBER,
      name: IModelFillAblesTypes.STRING,
      description: IModelFillAblesTypes.STRING,
      dueDate: IModelFillAblesTypes.DATE,
      favorite: IModelFillAblesTypes.BOOL,
      status: IModelFillAblesTypes.STRING,
      tasklistId: IModelFillAblesTypes.NUMBER,
      userId: IModelFillAblesTypes.NUMBER,
      createdAt: IModelFillAblesTypes.DATE,
      updatedAt: IModelFillAblesTypes.DATE
    };
  };

  // COSTUM FACADES ----------------------------------------------
  /**
   * find all favorite Tasks
   */
  public static favorites(): ng.IPromise<ITaskModel[]> { return new TaskModel()._customRead(`/${TaskModel.rootUrl}/favorites`); }

  /**
   * find all archived Tasks
   */
  public static archived(): ng.IPromise<ITaskModel[]> { return new TaskModel()._customRead(`/${TaskModel.rootUrl}/archived`); }

  // STATIC FACADE -----------------------------------------------

  /**
   * find Entity
   * @param id
   */
  public static find(id): ng.IPromise<ITaskModel> { return new TaskModel()._find(id); }

  /**
   * find all Entities
   */
  public static all(): ng.IPromise<ITaskModel[]> { return new TaskModel()._all(); }

  /**
   * delete a Entity
   * @param id
   */
  public static destory(id): ng.IPromise<void> { return new TaskModel()._destory(id); }

  /**
   * create an Entity
   */
  public static create(data: IModelAttributes): ng.IPromise<ITaskModel> { return new TaskModel(data).save(); }
}

export default TaskModel;
