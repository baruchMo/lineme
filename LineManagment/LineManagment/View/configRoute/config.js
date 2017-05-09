function mySpa($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider)
{
    $routeProvider.when('/', { templateUrl: '/View/pages/instructions.html',CSS:'/View/lib/css/bootstrap.min.css' })
        .when('/contact', { templateUrl: '/View/pages/contact.html',CSS:'/View/lib/css/bootstrap.min.css' })
        .when('/Linecreator', { templateUrl: '/View/pages/LineCreator.html', cotroller: 'LinemanageCtrl', CSS: ['/View/lib/css/bootstrap.min.css','View/lib/css/myApp.css'] })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true).hashPrefix('!');

    var theme = $mdThemingProvider.theme('default');
    theme.primaryPalette('blue').accentPalette('green');
    $mdIconProvider.fontSet('md', 'material-icons');
}