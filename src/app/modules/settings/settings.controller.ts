import {ITitleService, injectName as TitleServiceInject} from './../../common/services/TitelService.ts';
import {ITokenResponseData} from './../../core/config/jwt.config';
import {injectName as HttpServiceInject, IHttpUtilService} from './../../common/utils/HttpService.ts';
import UserModel, {IUserModel} from './../../models/user.model.ts';
let md5 = require('md5');

export class SettingsController {
  public userName: string = 'david.weber@w3tec.ch';
  public password: string = 'awes0me!';
  public submitOp: ng.IPromise<ITokenResponseData>;
  public currentUser: IUserModel;

  public static $inject = [TitleServiceInject, 'localStorageService', HttpServiceInject, '$state', '$mdToast'];

  constructor(titleService: ITitleService,
              private localStorageService: ng.local.storage.ILocalStorageService,
              private httpService: IHttpUtilService,
              private $state: ng.ui.IStateService,
              private $mdToast: ng.material.IToastService
  ) {
    console.info('SettingsController');
    titleService.setTitle('MODULES.SETTINGS.TOOLBAR.TITLE');

    if (this.userLoggedIn) {
      UserModel.getCurrentUser().then(u => this.currentUser = u);
    }
  }

  public userLoggedIn = () => !!this.localStorageService.get('token');

  public getHashMail = (email: string) => md5(email);

  public logout = () => this.localStorageService.remove('token');

  public loggin = () => (this.submitOp = this.httpService.create('/authenticate', {
    email: this.userName,
    password: this.password
  }, undefined, true))
    .then((r: ITokenResponseData) => {
      this.localStorageService.set('token', r.token);
      this.$state.go('root.agenda');
    })
    .catch(e => this.$mdToast.showSimple('Username oder Passwort falsch.'));
}

export var namespace: string = 'app.settings';
export var injectName: string = `${namespace}.SettingsController`;
