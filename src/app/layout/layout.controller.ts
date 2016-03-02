import {ITitleService, injectName as TitleServiceInject} from './../common/services/TitelService.ts';
import {IToolbarSearchService, injectName as ToolbarSearchInject} from './../common/services/ToolbarSearchService.ts';

export class LayoutController {
  private sidebarId: string = 'layout.navigation';

  public showSearch: boolean = false;
  public search: string;

  private backButtonStates: string[] = [
    'root.taskDetail',
    'root.taskNew',
    'root.taskEdit'
  ];

  private notShowSearchButton: string[] = [
    'root.taskNew',
    'root.taskEdit',
    'root.settings',
    'root.taskDetail'
  ];

  private notShowAddButton: string[] = [
    'root.taskNew',
    'root.taskEdit',
    'root.settings',
    'root.taskDetail',
    'root.categories'
  ];

  public static $inject = ['$rootScope', '$mdSidenav', '$state', '$window', TitleServiceInject, ToolbarSearchInject];
  constructor(
    $rootScope: ng.IRootScopeService,
    private $mdSidenav: ng.material.ISidenavService,
    private $state: ng.ui.IStateService,
    private $window: ng.IWindowService,
    private titleService: ITitleService,
    private toolbarSearch: IToolbarSearchService
  ) {
    console.info('LayoutController');

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, error) => {
      if (this.backButtonStates.indexOf(toState.name) >= 0) {
        this.showSearch = false;
      }
    });
  }

  public toggleSidebar = () => this.$mdSidenav(this.sidebarId).toggle();

  public navigateTo = (stateId: string) => this.toggleSidebar() && this.$state.go(stateId);

  public getToolbarTitle = () => this.titleService.getTitle();

  public showBackButton = () => this.backButtonStates.indexOf(this.$state.current.name) >= 0;

  public dontShowSearchButton = () => !(this.notShowSearchButton.indexOf(this.$state.current.name) >= 0);

  public dnotShowAddButton = () => !(this.notShowAddButton.indexOf(this.$state.current.name) >= 0);

  public goBack = () => this.$window.history.back();

  public searchChanged = () => this.toolbarSearch.setSearch(this.search);

  public closeSearch = () =>  {
    this.showSearch = false;
    this.toolbarSearch.setSearch('');
  };

}

export var namespace: string = 'app.layout';
export var injectName: string = `${namespace}.LayoutController`;
