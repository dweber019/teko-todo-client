/**
 * Translate Config
 */
export const TranslateConfig = ($translateProvider) => {
  $translateProvider.useStaticFilesLoader({
    prefix: './i18n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('de');
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

};
TranslateConfig.$inject = ['$translateProvider'];
