import {ITaskModel, ITaskModelStatus} from './../../models/task.model.ts';

export var namespace: string = 'app.common.directives';
export var injectName: string = `${namespace}.TaskActionSheetController`;

export class TaskActionSheetController {

  public static $inject = ['task', '$mdBottomSheet'];
  constructor(
    private task: ITaskModel,
    private $mdBottomSheet: ng.material.IBottomSheetService
  ) {
  }

  public isTaskArchived = () => this.task.attributes.status === ITaskModelStatus.ARCHIVED;
  public isTaskClosed = () => this.task.attributes.status === ITaskModelStatus.CLOSED;

  public clickItem = (item: string) => this.$mdBottomSheet.hide(item);

}
