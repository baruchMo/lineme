function mySpa($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider)
{
    $routeProvider.when('/', { templateUrl: '/View/pages/instructions.html' })
    .when('/contact', { templateUrl: '/View/pages/contact.html' })
        .when('/Linecreator', { templateUrl: '/View/pages/LineCreator.html', cotroller:'LinemanageCtrl' })
        .otherwise({ redirectTo: '/index.html' });

    $locationProvider.html5Mode(true).hashPrefix('!');

    var theme = $mdThemingProvider.theme('default');
    theme.primaryPalette('blue').accentPalette('green');
    $mdIconProvider.fontSet('md', 'material-icons');
}