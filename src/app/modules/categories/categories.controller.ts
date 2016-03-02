import {ITitleService, injectName as TitleServiceInject} from './../../common/services/TitelService.ts';
import TaskList, {ITaskListModel} from './../../models/taskList.model.ts';
import {IToolbarSearchService, injectName as ToolbarSearchInject} from './../../common/services/ToolbarSearchService.ts';

export class CategoriesController {

  public categories: ITaskListModel[];
  public taskListsPromise: ng.IPromise<ITaskListModel[]>;

  public static $inject = [TitleServiceInject, ToolbarSearchInject];
  constructor(
    titleService: ITitleService,
    private toolarSearchService: IToolbarSearchService
  ) {
    console.info('CategoriesController');
    titleService.setTitle('MODULES.CATEGORIES.TOOLBAR.TITLE');

    this.taskListsPromise = TaskList.all().then(r => this.categories = r);
  }

  public getSearchValue = () => this.toolarSearchService.getSearch();

}

export var namespace: string = 'app.categories';
export var injectName: string = `${namespace}.CategoriesController`;
