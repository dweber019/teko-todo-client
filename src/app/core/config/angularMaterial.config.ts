/**
 * Agnular Material Config
 */
export const AngularMaterialThemeConfig = ($mdThemingProvider: ng.material.IThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('pink');
};
AngularMaterialThemeConfig.$inject = ['$mdThemingProvider'];
