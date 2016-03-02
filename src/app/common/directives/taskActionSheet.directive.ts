import {ITaskModel, ITaskModelStatus} from './../../models/task.model.ts';
import {injectName as TaskActionSheetControllerName} from './taskActionSheet.controller.ts';

export var namespace: string = 'app.common.directives';
export var injectName: string = `${namespace}.TaskActionSheetDirectiveController`;

export class TaskActionSheetDirective implements angular.IDirective {
  public restrict = 'E';
  public template = require('./taskActionSheet.directive.html');
  public controller = injectName;
  public controllerAs = 'vm';
  public bindToController = true;
  public scope = {
    task: '='
  };
}

export class TaskActionSheetDirectiveController {
  public task: ITaskModel;

  public static $inject = ['$mdBottomSheet', '$state'];
  constructor(
    private $mdBottomSheet: ng.material.IBottomSheetService,
    private $state: ng.ui.IStateService
  ) {
  }

  public openActionSheet = () => this.$mdBottomSheet.show({
    template: require('./taskActionSheet.template.html'),
    controller: TaskActionSheetControllerName,
    controllerAs: 'vm',
    locals: {
      task: this.task
    }
  }).then((clickedItem) => {
    switch (clickedItem) {
      case 'open':
        this.$state.go('root.taskDetail', { id: this.task.attributes.id });
        break;
      case 'favorit':
        this.task.attributes.favorite = !this.task.attributes.favorite;
        this.task.save();
        break;
      case 'done':
        this.task.attributes.status = ITaskModelStatus.CLOSED;
        this.task.save();
        break;
      case 'archive':
        this.task.attributes.status = ITaskModelStatus.ARCHIVED;
        this.task.save();
        break;
      default:
        break;
    }
  });

}
