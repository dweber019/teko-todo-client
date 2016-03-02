import {RouterConfig} from './router.config.ts';
import {PromiseConfig} from './promise.config.ts';
import {IonicConfig, IonicPlatform} from './ionic.config.ts';
import {MomentConfig} from './moment.config.ts';
import {TranslateConfig} from './translate.config.ts';
import {LocalStorageConfig} from './localStorage.config.ts';
import {AngularMaterialThemeConfig} from './angularMaterial.config.ts';
import {JwtConfig} from './jwt.config.ts';
import {LoggerConfig} from './logger.config.ts';
import {modelConfig} from './model.config.ts';

export var namespace: string = 'app.config';

export default angular
  .module(namespace, [

  ])
  .config(RouterConfig)
  .config(PromiseConfig)
  .config(IonicConfig)
  .config(TranslateConfig)
  .config(LocalStorageConfig)
  .config(AngularMaterialThemeConfig)
  .config(LoggerConfig)
  .config(JwtConfig)
  .run(IonicPlatform)
  .run(MomentConfig)
  .run(modelConfig).name;
