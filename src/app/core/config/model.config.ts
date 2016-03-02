/**
 * Model Config
 */
import {injectName as HttpServiceName} from './../../common/utils/HttpService.ts';
import AbstractModel from '../../models/abstract.model.ts';

export const modelConfig = (httpService) => {
  AbstractModel.httpService = httpService;
};
modelConfig.$inject = [HttpServiceName];
