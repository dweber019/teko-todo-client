import {ITitleService, injectName as TitleServiceInject} from './../../common/services/TitelService.ts';
import TaskModel, {ITaskModel} from './../../models/task.model.ts';
import {IToolbarSearchService, injectName as ToolbarSearchInject} from './../../common/services/ToolbarSearchService.ts';

export class ArchivController {

  private tasks: ITaskModel[];
  public tasksPromise: ng.IPromise<ITaskModel[]>;

  public static $inject = [TitleServiceInject, ToolbarSearchInject];
  constructor(
    titleService: ITitleService,
    private toolarSearchService: IToolbarSearchService
  ) {
    console.info('ArchivController');
    titleService.setTitle('MODULES.ARCHIV.TOOLBAR.TITLE');

    this.loadTasks();
  }

  public getTasks = () => this.tasks &&
    this.tasks
      .sort((a, b) =>  b.attributes.id - a.attributes.id);

  public loadTasks = () => this.tasksPromise = TaskModel.archived().then(r => this.tasks = r);

  public getSearchValue = () => this.toolarSearchService.getSearch();

  public taskSwipLeft = (task: ITaskModel) => console.log('swipe left on task: ', task.attributes.name);
  public taskSwipRight = (task: ITaskModel) => console.log('swipe right on task: ', task.attributes.name);

}

export var namespace: string = 'app.archiv';
export var injectName: string = `${namespace}.ArchivController`;
