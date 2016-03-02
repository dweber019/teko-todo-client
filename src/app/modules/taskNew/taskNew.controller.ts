import {ITitleService, injectName as TitleServiceInject} from './../../common/services/TitelService.ts';
import TaskModel, {ITaskModel, ITaskModelStatus} from './../../models/task.model.ts';
import UserModel, {IUserModel} from './../../models/user.model.ts';
import TaskListModel, {ITaskListModel} from './../../models/taskList.model.ts';
import moment = require('moment');
let md5 = require('md5');

export interface ITaskNewStateParams extends ng.ui.IStateParamsService {
  id: number;
}

export class TaskNewController {

  public task: ITaskModel;
  public user: IUserModel;
  public taskList: ITaskListModel;
  public reminder: Date;
  public time: Date;

  public autoTaskLists: ITaskListModel[];
  public autoTaskListText: string;
  public autoTaskListItem: ITaskListModel;

  public autoUsers: IUserModel[];
  public autoUserText: string;
  public autoUserItem: IUserModel;

  public submitOp: ng.IPromise<ITaskModel>;

  public static $inject = [TitleServiceInject, '$stateParams', '$state'];
  constructor(
    titleService: ITitleService,
    private $stateParams: ITaskNewStateParams,
    private $state: ng.ui.IStateService,
    private $mdpDatePicker: any,
    private $mdpTimePicker: any
  ) {
    console.info('TaskNewController');
    titleService.setTitle('MODULES.TASK_DETAIL.TOOLBAR.TITLE');

    this.loadTask();
  }

  public getHashMail = (email: string) => md5(email);

  public changeDate = () => this.task.attributes.dueDate = moment(this.reminder);

  private loadTask = () => {
    let id = this.$stateParams.id;

    if (id) {
      TaskModel.find(id).then(r => this.task = r).then(() => {
        UserModel.find(this.task.attributes.userId).then(r => this.user = this.autoUserItem = r);
        TaskListModel.find(this.task.attributes.tasklistId).then(r => this.taskList = this.autoTaskListItem = r);
        this.reminder = this.task.attributes.dueDate.toDate();
        this.time = this.task.attributes.dueDate.toDate();
      });
    } else {
      this.task = new TaskModel();
      this.task.attributes.status = ITaskModelStatus.OPEN;
    }

    TaskListModel.all().then(r => this.autoTaskLists = r);
    UserModel.all().then(r => this.autoUsers = r);
  };

  public saveNew = () => {
     if (angular.isDefined(this.autoUserItem)) {
       this.task.attributes.userId = <number>this.autoUserItem.getId();
     }
     if (angular.isDefined(this.autoTaskListItem)) {
       this.task.attributes.tasklistId = <number>this.autoTaskListItem.getId();
     }
     this.task.attributes.dueDate = (this.reminder && this.time) &&
      moment(moment(this.reminder).format('YYYY-MM-DD') + ' ' + moment(this.time).format('HH:mm:ss')) ||
      (this.reminder && !this.time) && moment(moment(this.reminder).format('YYYY-MM-DD')) || undefined;

     this.submitOp = this.task.save()
      .then((r: ITaskModel) => r.isNew() && this.$state.go('root.taskEdit', { id: this.task.getId() }) || this.$state.go('root.tasks'));
  };

}

export var namespace: string = 'app.taskNew';
export var injectName: string = `${namespace}.TaskNewController`;
