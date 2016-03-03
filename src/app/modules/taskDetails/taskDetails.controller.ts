import {ITitleService, injectName as TitleServiceInject} from './../../common/services/TitelService.ts';
import TaskModel, {ITaskModel, ITaskModelStatus} from './../../models/task.model.ts';
import UserModel, {IUserModel} from './../../models/user.model.ts';
import TaskListModel, {ITaskListModel} from './../../models/taskList.model.ts';

export interface ITaskDetialsStateParams extends ng.ui.IStateParamsService {
  id: number;
}

export class TaskDetailsController {

  public task: ITaskModel;
  public user: IUserModel;
  public taskList: ITaskListModel;
  public status: ITaskModelStatus;

  public static $inject = [TitleServiceInject, '$stateParams', '$state', '$mdDialog'];
  constructor(
    titleService: ITitleService,
    private $stateParams: ITaskDetialsStateParams,
    private $state: ng.ui.IStateService,
    private $mdDialog: ng.material.IDialogService
  ) {
    console.info('TaskDetailsController');
    titleService.setTitle('MODULES.TASK_DETAIL.TOOLBAR.TITLE');

    this.loadTask();
  }

  public toggleFavorite = () => {
    this.task.attributes.favorite = !this.task.attributes.favorite;
    this.task.save().then(() => this.loadTask());
  };

  public markDone = () => {
    this.task.attributes.status = ITaskModelStatus.CLOSED;
    this.task.save();
    this.$state.go('root.tasks', {}, {reload: true});
  };

  public delete = (event) => {
    const confirmDialog: ng.material.IConfirmDialog = this.$mdDialog.confirm()
      .title('Möchtest du die Aufabge wirklich löschen?')
      .textContent('Dieser Schritt ist unwiederruflich.')
      .ariaLabel('Aufabe löschen')
      .targetEvent(event)
      .ok('Löschen')
      .cancel('Abbrechen');
    this.$mdDialog.show(confirmDialog).then(() => {
      this.task.destroy();
      this.$state.go('root.tasks', {}, {reload: true});
    });
  };

  public statusChanged = () => {
    this.task.attributes.status = this.status;
    this.task.save().then(() => this.loadTask());
  };

  private loadTask = () => {
    let id = this.$stateParams.id;

    TaskModel.find(id).then(r => this.task = r).then(t => {
      UserModel.find(this.task.attributes.userId).then(r => this.user = r);
      TaskListModel.find(this.task.attributes.tasklistId).then(r => this.taskList = r);
      this.status = this.task.attributes.status;
      return t;
    });
  };

}

export var namespace: string = 'app.taskDetails';
export var injectName: string = `${namespace}.TaskDetailsController`;
