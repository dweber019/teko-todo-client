/**
 * Agnular Material Config
 */
import AppConfig from './app.config.ts';
import Logger, {LogLevels} from './../../common/utils/Logger.service.ts';

export const LoggerConfig = () => {
  Logger.setLogLevel(LogLevels[AppConfig.LOG_LEVEL]);
};
LoggerConfig.$inject = [];
