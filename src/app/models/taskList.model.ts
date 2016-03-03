import AbstractModel, {IModelFillAbles, IModelFillAblesTypes, IModelAttributes, IAbstractModel} from './abstract.model.ts';

export interface ITaskListModelAttributes {
  id: number;
  name: string;
  color: string;
  order: number;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}

export interface ITaskListModel extends IAbstractModel {
  attributes: ITaskListModelAttributes;
}

class TaskListModel extends AbstractModel {

  /* tslint:disable:no-unused-variable */
  private static rootUrl = 'tasklists';
  /* tslint:enable:no-unused-variable */

  constructor(attrs?: IModelAttributes) {
    super(TaskListModel, attrs);
  }

  protected fillAbles(): IModelFillAbles {
    return {
      id: IModelFillAblesTypes.NUMBER,
      name: IModelFillAblesTypes.STRING,
      color: IModelFillAblesTypes.STRING,
      order: IModelFillAblesTypes.NUMBER,
      createdAt: IModelFillAblesTypes.DATE,
      updatedAt: IModelFillAblesTypes.DATE
    };
  };

  // CUSTOM FACADE -----------------------------------------------

  // STATIC FACADE -----------------------------------------------

  /**
   * find Entity
   * @param id
   */
  public static find(id): ng.IPromise<ITaskListModel> { return new TaskListModel()._find(id); }

  /**
   * find all Entities
   */
  public static all(): ng.IPromise<ITaskListModel[]> { return new TaskListModel()._all(); }

  /**
   * delete a Entity
   * @param id
   */
  public static destory(id): ng.IPromise<void> { return new TaskListModel()._destory(id); }

  /**
   * create an Entity
   */
  public static create(data: IModelAttributes): ng.IPromise<ITaskListModel> { return new TaskListModel(data).save(); }
}

export default TaskListModel;
