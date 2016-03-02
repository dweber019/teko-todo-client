import {ITitleService, injectName as TitleServiceInject} from './../../common/services/TitelService.ts';
import TaskModel, {ITaskModel, ITaskModelStatus} from './../../models/task.model.ts';
import {IToolbarSearchService, injectName as ToolbarSearchInject} from './../../common/services/ToolbarSearchService.ts';
import moment = require('moment');

export class AgendaController {

  private tasks: ITaskModel[];
  private previouseDate: moment.Moment;
  private showSubheaderIndexes: number[] = [];
  public tasksPromise: ng.IPromise<ITaskModel[]>;

  public static $inject = [TitleServiceInject, ToolbarSearchInject];
  constructor(
    titleService: ITitleService,
    private toolarSearchService: IToolbarSearchService
  ) {
    console.info('AgendaController');
    titleService.setTitle('MODULES.AGENDA.TOOLBAR.TITLE');

    this.loadTasks();
  }

  public getTasks = () => this.tasks &&
    this.tasks
      .filter(i => i.attributes.status !== ITaskModelStatus.ARCHIVED)
      .sort((a, b) => <any>b.attributes.dueDate.toDate() - <any>a.attributes.dueDate.toDate())
      .map((element, index, array) => {
        if (this.dateBiggerThenPreviouse(element.attributes.dueDate)) {
          this.showSubheaderIndexes.push(index);
        }
        return element;
      });

  public indexExists = (index: number) => (this.showSubheaderIndexes.indexOf(index) > -1);

  public loadTasks = () => this.tasksPromise = TaskModel.all().then(r => this.tasks = r);

  public getSearchValue = () => this.toolarSearchService.getSearch();

  public taskSwipLeft = (task: ITaskModel) => console.log('swipe left on task: ', task.attributes.name);
  public taskSwipRight = (task: ITaskModel) => console.log('swipe right on task: ', task.attributes.name);

  private dateBiggerThenPreviouse = (currentDate: moment.Moment) => {
    let prevDate = this.previouseDate && moment(this.previouseDate) || moment(currentDate).add(1, 'days');
    if (moment(currentDate).isBefore(prevDate, 'day')) {
      this.previouseDate = currentDate;
      return true;
    }
    return false;
  };

}

export var namespace: string = 'app.agenda';
export var injectName: string = `${namespace}.AgendaController`;
