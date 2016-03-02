import {ITitleService, injectName as TitleServiceInject} from './../../common/services/TitelService.ts';
import TaskModel, {ITaskModel, ITaskModelStatus} from './../../models/task.model.ts';
import {IToolbarSearchService, injectName as ToolbarSearchInject} from './../../common/services/ToolbarSearchService.ts';

export class FavoritesController {

  private tasks: ITaskModel[];
  public tasksPromise: ng.IPromise<ITaskModel[]>;

  public static $inject = [TitleServiceInject, ToolbarSearchInject];
  constructor(
    titleService: ITitleService,
    private toolarSearchService: IToolbarSearchService
  ) {
    console.info('FavoritesController');
    titleService.setTitle('MODULES.FAVORITES.TOOLBAR.TITLE');

    this.loadTasks();
  }

  public getTasks = () => this.tasks &&
    this.tasks
      .filter(i => i.attributes.status !== ITaskModelStatus.ARCHIVED)
      .sort((a, b) =>  b.attributes.id - a.attributes.id);

  public loadTasks = () => this.tasksPromise = TaskModel.favorites().then(r => this.tasks = r);

  public getSearchValue = () => this.toolarSearchService.getSearch();

  public taskSwipLeft = (task: ITaskModel) => console.log('swipe left on task: ', task.attributes.name);
  public taskSwipRight = (task: ITaskModel) => console.log('swipe right on task: ', task.attributes.name);

}

export var namespace: string = 'app.favorites';
export var injectName: string = `${namespace}.FavoritesController`;
