/**
 * Localstorage Config
 */
export const LocalStorageConfig = (localStorageServiceProvider) => {
  localStorageServiceProvider
    .setPrefix('tekoTodoClient')
    .setNotify(true, true);
};
