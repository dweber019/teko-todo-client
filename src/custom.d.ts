/**
 * Extend IRequest to add jwt option
 */
declare module angular {
  export interface IRequestConfig {
    skipAuthorization?: boolean;
  }
}